//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ITokenAction.sol";
import "./Token.sol";


/**
 * @notice Token Center
 * @dev Allows creating a token and buying/selling on a XY=k bonding curve
 */
contract TokenController is Ownable{
  // Events
  event LasBuyas(address indexed user, address indexed token, uint amount, uint quoteAmount);
  event LasSellas(address indexed user, address indexed token, uint amount, uint quoteAmount);
  event LasCreationas(address indexed user, address indexed token);
  event LasTicketas(address indexed user, address indexed token, uint amount);
  event WinningClaim(address indexed user, address indexed token, uint amount);
  event SetTvlLevel(address levelAction, uint8 level, uint tvl);
  
  address[] public tokens;
  mapping(string => address) public tickers;
  
  struct AmmBalances {
    uint baseBalance;
    uint quoteBalance;
  }
  mapping(address => AmmBalances) public balances;
  // daily pot
  mapping(uint64 => uint) public dailyJackpot;
  mapping(uint64 => bool) public isJackpotClaimed;
  
  // Track last daily swap
  mapping(address => mapping(uint64 => uint)) public tokenDailyCloses;
  // Lottery parameters
  struct LotterySettings {
    uint strike;
    uint payoutPerTicket;
    uint totalOI;
  }
  mapping(address => mapping(uint64 => LotterySettings)) public tokenDailyLotterySettings;
  mapping(address => mapping(uint64 => mapping(address => uint))) public tokenDailyLotteryUserBalances;
  mapping(uint64 => address[5]) public tokenDailyLotteryLeaders;

  uint public constant TOTAL_SUPPLY = 1_000_000_000e18;
  
  // bonding curve constant product
  // (quoteAmount/(quoteAmountAt50percentDistribution) + 1) * baseAmount = totalSupply
  // slope defines aggressiveness, and is the amount of quote necessary to sell out half the supply
  // so marketing parameter, depends on the quote token value
  uint private immutable constantProduct;
  uint public slope = 15000e18;
  
  uint16 public tradingFee; // trading fee X4: 10000 is 100%
  uint16 public treasuryFee; // trading fee X4: 10000 is 100%
  address public treasury;
  
  // After a given mcap is reached part of liquidity deposited in AMM, default 50k BERA
  uint public mcapToAmm = 50_000e18;
  

  constructor () {
    setTradingFees(10, 10); // initial trading fee: 0.1% treasury: 0.1%
    setTreasury(msg.sender);
    // set constant product as TOTAL_SUPPLY * 10**(quoteDecimals - 4), making token very cheap to start with
    // (actually 0 held, so need to force first buy to be higher than that to account)
    constantProduct = TOTAL_SUPPLY;
  }
  
  ///////////////// ADMIN FUNCTIONS
  
  /// @notice Set the trading fee
  function setTradingFees(uint16 _tradingFee, uint16 _treasuryFee) public onlyOwner {
    require(_tradingFee < 100 && _treasuryFee < 100, "Trading fee too high");
    tradingFee = _tradingFee;
    treasuryFee = _treasuryFee;
  }
  
  /// @notice  Set treasury address
  function setTreasury(address _treasury) public onlyOwner {
    require(_treasury != address(0), "Invalid treasury");
    treasury = _treasury;
  }
  
  /// @notice  Set treasury address
  function setSlope(uint _slope) public onlyOwner {
    require(_slope > 1e18, "Invalid slope");
    slope = _slope;
  }
  
  /// @notice Set minimum tvl for action to be taken
  function setMcapToAmm(uint _mcapToAmm) public onlyOwner {
    require(_mcapToAmm > 1000e18 && _mcapToAmm < 100_000_000e18, "Invalid Mcap");
    mcapToAmm = _mcapToAmm;
  }
  
  
  ///////////////// USEFUL GETTERS
  
  
  function getTokensLength() public view returns (uint) {return tokens.length;}
  
  /// @notice Get latest tokens, convenient in some cases
  function getLastTokens() public view returns (address[] memory lastTokens){
    uint tlen = tokens.length;
    uint max = tlen;
    if (max > 20) max = 20;
    lastTokens = new address[](max);
    for (uint k = 1 ; k <= max; k++) lastTokens[k-1] = tokens[tlen - k];
  }
  
  
  /// @notice Get token mcap
  function getMcap(address token) public view returns (uint mcap) {
    AmmBalances memory bals = balances[token];
    if (bals.baseBalance > 0) mcap = bals.quoteBalance * TOTAL_SUPPLY / bals.baseBalance;
  }
  
  
  /// @notice Token price e18, i.e token amount per 1 BERA
  /// @dev We use the bonding curve to get the price based on a very small amount of quote
  function getPrice(address token) public view returns (uint price){
    uint baseAmount = getBuyAmount(token, 1e9);
    price = 1e27 / baseAmount;
  }
  
  
  /// @notice Get lottery settings
  function getLotterySettings(address token, uint64 round) public view returns (uint strike, uint payoutPerTicket, uint totalOI){
    LotterySettings memory ls = tokenDailyLotterySettings[token][round];
    strike = ls.strike;
    payoutPerTicket = ls.payoutPerTicket;
    totalOI = ls.totalOI;
  }
  
  
  /// @notice Get user lottery payout
  function getUserLotteryPayout(address token, uint64 round, address user) public view returns (uint userPayout){
    userPayout = tokenDailyLotteryUserBalances[token][round][user];
  }
  
  
  ///////////////// BUY/SELL FUNCTIONS
  
  /// @notice Create a token
  function createToken(string memory name, string memory symbol, string memory desc) public payable returns (address token, uint baseAmount){
    require(tickers[symbol] == address(0), "Create: Already registered");
    token = address(new Token(name, symbol, desc, TOTAL_SUPPLY));
    tickers[symbol] = token;
    balances[token] = AmmBalances(TOTAL_SUPPLY, 0);
    tokens.push(token);
    emit LasCreationas(msg.sender, token);
    // min bought 0 as cant be frontrun here
    if (msg.value > 0) baseAmount = buy(token, 0);
  }
  
  /// @notice Get token amount bought, excluding fee
  function getBuyAmount(address token, uint quoteAmount) public view returns (uint buyAmount) {
    AmmBalances memory bals = balances[token];
    // (quoteBalanceBefore/slope + 1) * baseBalanceBefore = constantProduct = (quoteBalanceAfter/slope + 1) * baseBalanceAfter
    // => baseBalanceAfter = baseBalanceBefore - buyAmount = constantProduct *slope / (quoteBalanceAfter + slope)
    buyAmount = bals.baseBalance - constantProduct * slope / (bals.quoteBalance + quoteAmount + slope);
  }
  

  /// @notice Buy token, with minAmount to prevent excessive slippage
  function buy(address token, uint minBoughtTokens) public payable returns (uint baseAmount){
    splitJackpot(today()-1);
    if (tokenDailyCloses[token][today()-1] == 0) _setDailyClose(token, today() - 1); // set yesterday's close if necessary
    require(msg.value > 0, "Swap: Invalid buy amount");
    uint _tradingFee = msg.value * tradingFee / 1e4;
    uint _treasuryFee = msg.value * treasuryFee / 1e4;
    (bool success, ) = payable(treasury).call{value: _treasuryFee}("");
    require(success, "Swap: Error sending quote");
    // add trading fee to tomorrow's pool
    _depositJackpot(_tradingFee / 2, today());
    _depositJackpot(_tradingFee / 2, today()+1);
    
    require(baseAmount >= minBoughtTokens, "Swap: Excessive slippage");
    require(baseAmount <= balances[token].baseBalance 
                            - tokenDailyLotterySettings[token][today()].totalOI
                            - tokenDailyLotterySettings[token][today()+1].totalOI,
                            "Swap: Excessive buy amount");
    
    baseAmount = getBuyAmount(token, msg.value - _tradingFee - _treasuryFee);
    balances[token].baseBalance -= baseAmount;
    balances[token].quoteBalance += msg.value - _tradingFee - _treasuryFee;

    ERC20(token).transfer(msg.sender, baseAmount);
    _setDailyClose(token, today()); //set today's close
    emit LasBuyas(msg.sender, token, baseAmount, msg.value);
  }
  
  
  /// @notice Get base token amount from sale
  function getAmountSale(address token, uint baseAmount) public view returns (uint quoteAmount){
    AmmBalances memory bals = balances[token];
    // constantProduct = (quoteBalanceAfter/slope + 1) * baseBalanceAfter  = (quoteBalanceAfter + slope) * baseBalanceAfter / slope
    // => quoteBalanceAfter + slope = quoteBalanceBefore - quoteAmount + slope 
    //      = constantProduct * slope / baseBalanceAfter
    quoteAmount = bals.quoteBalance + slope - constantProduct * slope / (bals.baseBalance + baseAmount);
  }
  
  
  /// @notice Sell token amount 
  function sell(address token, uint baseAmount) public returns (uint quoteAmount) {
    splitJackpot(today()-1);
    if (tokenDailyCloses[token][today()-1] == 0) _setDailyClose(token, today() - 1); // set yesterday's close if necessary
    require(baseAmount > 0, "Swap: Invalid sell amount");
    ERC20(token).transferFrom(msg.sender, address(this), baseAmount);
    uint quoteAmountBeforeFee = getAmountSale(token, baseAmount);
    balances[token].baseBalance += baseAmount;
    balances[token].quoteBalance -= quoteAmountBeforeFee;
    
    uint _tradingFee = quoteAmountBeforeFee * tradingFee / 1e4;
    uint _treasuryFee = quoteAmountBeforeFee * treasuryFee / 1e4;
    quoteAmount  = quoteAmountBeforeFee - _tradingFee - _treasuryFee;
    _depositJackpot(_tradingFee / 2, today());
    _depositJackpot(_tradingFee / 2, today()+1);
    (bool success, ) = payable(treasury).call{value: _treasuryFee}("");
    require(success, "Swap: Error sending quote fee");
    (success, ) = payable(msg.sender).call{value: quoteAmount}("");
    require(success, "Swap: Error sending quote");

    _setDailyClose(token, today());
    emit LasSellas(msg.sender, token, baseAmount, quoteAmount);
  }
  
  
  ///////////////// LOTTERY FUNCTIONS
  /**
    Lottery happens daily, expires at 0 UTC. Tickets are bought at day d, with expiry at d+1
    First ticket purchase defines next day's lottery parameters: strike & payout per ticket
    When first ticket purchase, strike is set at 5x.
    Bc at 5x the user has made 100x, the payout is 20x the current token price
  */
  /// @notice Buy lottery ticket
  /// @dev Ticket expire end of next day and premiums are in next day's jackpot
  function buyTicket(address token) public payable returns (uint payout, uint strike) {
    require(msg.value > 0, "100xOrBust: Invalid amount");
    require(getMcap(token) > 10_000e18, "100xOrBust: Insufficient Mcap");
    uint64 round = today() + 1;
    splitJackpot(today() - 1); // split yesterday's jackpot 
    _setDailyClose(token, today()); // set today's close so we guarantee a value is available

    // 1. check lottery parameters (price non 0 since mcap > 10k)
    uint price = getPrice(token);
    strike = tokenDailyLotterySettings[token][round].strike;
    // init if lottery not started for that token+day
    if (strike == 0) {
      strike = price * 5;
      tokenDailyLotterySettings[token][round].strike = strike;
      tokenDailyLotterySettings[token][round].payoutPerTicket = 1e36 / price * 20;
    }
    // 2. calculate potential payout
    payout = tokenDailyLotterySettings[token][round].payoutPerTicket * msg.value / 1e18;
    
    // check that there's actually enough bal to buy that: prev round (claims ongoing), today (curr. locked), tomorrow
    require(payout <= balances[token].baseBalance 
                            - tokenDailyLotterySettings[token][today() - 1].totalOI
                            - tokenDailyLotterySettings[token][today()].totalOI
                            - tokenDailyLotterySettings[token][today() + 1].totalOI,
                            "100xOrBust: Excessive buy amount");
    // 3. set OI, jackpot and top 5
    tokenDailyLotteryUserBalances[token][round][msg.sender] = payout;
    tokenDailyLotterySettings[token][round].totalOI += payout;
    _updateTop5(token, tokenDailyLotterySettings[token][round].totalOI);
    uint _treasuryFee = msg.value * treasuryFee / 1e4;
    (bool success, ) = payable(treasury).call{value: _treasuryFee}("");
    require(success, "100xOrBust: Error sending quote fee");
    dailyJackpot[round] += msg.value - _treasuryFee;
    emit LasTicketas(msg.sender, token, msg.value);
  }
  
  
  /// @notice Claim lottery payout
  /// @dev Can only claim the previous, after which rewards are lost
  function claim(address token) public returns (uint payout) {
    uint64 round = today() - 1;
    splitJackpot(round);
    payout = tokenDailyLotteryUserBalances[token][round][msg.sender];
    console.log("payout", payout);
    // if there is OI there is a price since we set price during ticket sale
    if (payout > 0){
      uint strike = tokenDailyLotterySettings[token][round].strike;
      if (tokenDailyCloses[token][round] >= strike) {
        ERC20(token).transfer(msg.sender, payout);
        balances[token].baseBalance -= payout;
        tokenDailyLotteryUserBalances[token][round][msg.sender] = 0; // no dual claim pls
        emit WinningClaim(msg.sender, token, payout);
      }
      else payout = 0;
    }
  }
  
  
  /// @notice Deposit jackpot
  function _depositJackpot(uint amount, uint64 round) internal {
    dailyJackpot[round] += amount;
  }
  function depositJackpot() public payable {
    _depositJackpot(msg.value, today() + 1);
  }
  
  
  /// @notice Lottery settlement: pick the winners and split the jackpot
  /// @dev Split the jackpot between top 5, deposit 40-25-15-10-10% directly in the pair AMM accounting
  /// @dev Specify a previous jackpot in case nobody traded some day to avoid losing funds
  function splitJackpot(uint64 round) public {
    require(round < today(), "100xOrBust: Round ongoing");
    if (!isJackpotClaimed[round] && dailyJackpot[round] > 0){
      uint jackpot = dailyJackpot[round];
      uint sent;
      address[5] memory winners = tokenDailyLotteryLeaders[round];
      uint8[5] memory payouts = [40, 25, 15, 10, 10];
      // 40% for token 1 winner etc.
      // note: rounding errors may lead in few weis lost, ignore
      for (uint8 k; k<5; k++)
        sent += _distributeRewards(winners[k], jackpot * payouts[k] / 100);
      // if some rewards not sent, e.g there's no winner token, roll over rewards to next active round (today)
      if (sent < jackpot) _depositJackpot(jackpot - sent, today());
      isJackpotClaimed[round] = true;
    }
  }
  
  function _distributeRewards(address token, uint quoteAmount) internal returns (uint sent) {
    if (token != address(0)){
      balances[token].quoteBalance += quoteAmount;
      sent = quoteAmount;
    }
  }
  
  
  /// @notice Keep track of top 5 (for next round)
  /// @dev careful the total OI tracked is in base, while the top5 is in quote, need to div totalOi / payoutPerTicket 
  function _updateTop5(address token, uint premiumOi) internal {
    address nextToken = token;
    bool hasInserted = false;
    uint nextOI = premiumOi;
    uint64 round = today() + 1;
    address[5] memory top = tokenDailyLotteryLeaders[round];
    for (uint8 k; k < 5; k++){
      if (nextToken == token && hasInserted) break;
      uint payoutPerTicket = tokenDailyLotterySettings[top[k]][round].payoutPerTicket;
      uint kOI = payoutPerTicket > 0 ? 1e18 * tokenDailyLotterySettings[top[k]][round].totalOI / payoutPerTicket : 0;
      if (nextOI > kOI || top[k] == token){
        hasInserted = true;
        tokenDailyLotteryLeaders[round][k] = nextToken;
        nextToken = top[k];
        nextOI = kOI;
      }
      else 
        tokenDailyLotteryLeaders[round][k] = top[k];
    }
  }
  
  
  ///////////////// VARIOUS
  
  /// @notice Set daily close
  function _setDailyClose(address token, uint64 round) internal {
    uint price = getPrice(token);
    tokenDailyCloses[token][round] = price;
  }
  
  /// @notice today cast as uint64
  function today() public view returns (uint64) {
    return uint64(block.timestamp / 86400);
  }
 
}