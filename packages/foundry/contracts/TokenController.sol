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
  event SetTvlLevel(address levelAction, uint8 level, uint tvl);
  
  struct AmmBalances {
    uint baseBalance;
    uint quoteBalance;
  }
  mapping(address => AmmBalances) public balances;
  address[] public tokens;
  mapping(string => address) public tickers;

  uint public constant TOTAL_SUPPLY = 1_000_000_000e18;
  
  // bonding curve constant product
  // (quoteAmount/(quoteAmountAt50percentDistribution) + 1) * baseAmount = totalSupply
  // slope defines aggressiveness, and is the amount of quote necessary to sell out half the supply
  // so marketing parameter, depends on the quote token value
  uint private immutable constantProduct;
  uint private constant SLOPE = 15000e18;
  
  uint16 public tradingFee; // trading fee X4: 10000 is 100%
  address public treasury;
  
  // After a given mcap is reached stuff happens, e.g. part of liquidity deposited in AMM
  mapping(uint8 => uint) public tvlLevels;
  mapping(uint8 => address) public levelToAction;
  mapping(address => uint8) public tokenLevel;
  

  constructor () {
    setTradingFee(10); // initial trading fee: 0.1%
    setTreasury(msg.sender);
    // set constant product as TOTAL_SUPPLY * 10**(quoteDecimals - 4), making token very cheap to start with
    // (actually 0 held, so need to force first buy to be higher than that to account)
    constantProduct = TOTAL_SUPPLY;
  }
  
  ///////////////// ADMIN FUNCTIONS
  
  /// @notice Set the trading fee
  function setTradingFee(uint16 _tradingFee) public onlyOwner {
    require(_tradingFee < 100, "Trading fee too high");
    tradingFee = _tradingFee;
  }
  
  
  /// @notice  Set treasury address
  function setTreasury(address _treasury) public onlyOwner {
    require(_treasury != address(0), "Invalid treasury");
    treasury = _treasury;
  }
  
  /// @notice Set minimum tvl for action to be taken
  function setTvlLevel(address levelAction, uint8 level, uint tvl) public onlyOwner {
    uint nextLevel = tvlLevels[level+1];
    require(tvl < nextLevel || nextLevel == 0, "Unordered above");
    require(level == 0 || tvl > tvlLevels[level - 1], "Unordered below");
    tvlLevels[level] = tvl;
    levelToAction[level] = levelAction;
    emit SetTvlLevel(levelAction, level, tvl);
  }
  
  
  ///////////////// USEFUL GETTERS
  
  
  function getTokensLength() public returns (uint) {return tokens.length;}
  
  
  function getLastTokens() public view returns (address[] memory lastTokens){
    uint tlen = tokens.length;
    uint max = tlen;
    if (max > 20) max = 20;
    lastTokens = new address[](max);
    for (uint k = 1 ; k <= max; k++) lastTokens[k-1] = tokens[tlen - k];
  }
  
  
  ///////////////// LAUNCHPAD FUNCTIONS
  
  
  /// @notice Create a token
  function createToken(string memory name, string memory symbol, string memory desc) public payable returns (address token){
    require(tickers[symbol] == address(0), "Already registered");
    token = address(new Token(name, symbol, desc, TOTAL_SUPPLY));
    tickers[symbol] = token;
    balances[token] = AmmBalances(TOTAL_SUPPLY, 0);
    tokens.push(token);
    emit LasCreationas(msg.sender, token);
    // min bought 0 as cant be frontrun here
    buy(token, 0);
  }
  
  
  /// @notice Get token amount bought 
  function getBuyAmount(address token, uint quoteAmount) public returns (uint buyAmount) {
    uint fee = quoteAmount * tradingFee / 1e4;
    AmmBalances memory bals = balances[token];
    // (quoteBalanceBefore/slope + 1) * baseBalanceBefore = constantProduct = (quoteBalanceAfter/slope + 1) * baseBalanceAfter
    // => baseBalanceAfter = baseBalanceBefore - buyAmount = constantProduct *slope / (quoteBalanceAfter + slope)
    buyAmount = bals.baseBalance - constantProduct * SLOPE / (bals.quoteBalance + quoteAmount - fee + SLOPE);
    require(buyAmount <= ERC20(token).balanceOf(address(this)), "Insufficient token balance");
  }
  
  
  /// @notice Buy token, with minAmount to prevent excessive slippage
  function buy(address token, uint minBoughtTokens) public payable returns (uint baseAmount){
    uint quoteAmount = msg.value;
    if (quoteAmount > 0) {
      uint fee = quoteAmount * tradingFee / 1e4;
      (bool success, ) = payable(treasury).call{value: fee}("");
      require(success, "Error sending quote");
      baseAmount = getBuyAmount(token, quoteAmount);
      require(baseAmount >= minBoughtTokens, "Excessive slippage");
      ERC20(token).transfer(msg.sender, baseAmount);
      balances[token].baseBalance -= baseAmount;
      balances[token].quoteBalance += quoteAmount - fee;
      emit LasBuyas(msg.sender, token, baseAmount, quoteAmount);
      
      checkTokenLevel(token);
    }
  }
  
  
  /// @notice Get base amount from sale, before fee
  function _getAmountSale(address token, uint baseAmount) internal returns (uint quoteAmount) {
    AmmBalances memory bals = balances[token];
    // constantProduct = (quoteBalanceAfter/SLOPE + 1) * baseBalanceAfter  = (quoteBalanceAfter + SLOPE) * baseBalanceAfter / SLOPE
    // => quoteBalanceAfter + SLOPE = quoteBalanceBefore - quoteAmount + SLOPE 
    //      = constantProduct * SLOPE / baseBalanceAfter
    quoteAmount = bals.quoteBalance + SLOPE - constantProduct * SLOPE / (bals.baseBalance + baseAmount);
  }
  
  
  /// @notice Get base token amount from sale
  function getAmountSale(address token, uint baseAmount) public returns (uint quoteAmount){
    quoteAmount = _getAmountSale(token, baseAmount);
    quoteAmount = quoteAmount - (quoteAmount * tradingFee / 1e4);
  }
  
  
  /// @notice Sell token amount 
  function sell(address token, uint baseAmount) public returns (uint quoteAmount) {
    if (baseAmount > 0){
      ERC20(token).transferFrom(msg.sender, address(this), baseAmount);
      uint quoteAmountBeforeFee = _getAmountSale(token, baseAmount);
      uint fee = quoteAmountBeforeFee * tradingFee / 1e4;
      quoteAmount  = quoteAmountBeforeFee - fee;
      (bool success, ) = payable(treasury).call{value: fee}("");
      require(success, "Error sending quote fee");
      (success, ) = payable(msg.sender).call{value: quoteAmount}("");
      require(success, "Error sending quote");

      balances[token].baseBalance += baseAmount;
      balances[token].quoteBalance -= quoteAmountBeforeFee;
      emit LasSellas(msg.sender, token, baseAmount, quoteAmount);
    }
  }
  
  
  /// @notice Get token mcap
  function getMcap(address token) public returns (uint mcap) {
    AmmBalances memory bals = balances[token];
    if (bals.baseBalance > 0) mcap = bals.quoteBalance * TOTAL_SUPPLY / bals.baseBalance;
  }
  
  
  ///////////////// INTERNAL FUNCTIONS
  
  /// @notice Check if new token level reached in which case execute corresponding action
  function checkTokenLevel(address token) internal {
    uint mcap = getMcap(token);
    uint8 level = tokenLevel[token];
    uint nextTvlLevel = tvlLevels[level + 1];
    if (nextTvlLevel > 0 && mcap >= nextTvlLevel){
      ITokenAction action = ITokenAction(levelToAction[level+1]);
      // if next level reached, approve 20% of funds to be spent for next level
      AmmBalances memory bals = balances[token];
      ERC20(token).approve(address(action), bals.baseBalance / 5);
      ITokenAction(levelToAction[level+1]).doSomething{value: bals.quoteBalance / 5}(token, bals.baseBalance / 5);
      tokenLevel[token] = level + 1;
    }
  }
  
}