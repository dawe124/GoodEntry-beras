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
  event LasBuyas(address indexed user, address indexed token, uint amount);
  event LasSellas(address indexed user, address indexed token, uint amount);
  event LasCreationas(address indexed user, address indexed token);
  event SetTvlLevel(address levelAction, uint8 level, uint tvl);
  
  struct AmmBalances {
    uint baseBalance;
    uint quoteBalance;
  }
  mapping(address => AmmBalances) public balances;
  address[] public tokens;

  address public immutable quoteToken;
  uint8 private immutable quoteDecimals;
  uint public constant TOTAL_SUPPLY = 1_000_000_000e18;
  
  uint private immutable constantProduct; // bonding curve constant product
  
  uint16 public tradingFee; // trading fee X4: 10000 is 100%
  address public treasury;
  
  
  // After a given mcap is reached stuff happens, e.g. part of liquidity deposited in AMM
  uint[] public tvlLevels;
  mapping(uint8 => address) public levelToAction;
  mapping(address => uint8) public tokenLevel;
  

  constructor (address _quoteToken) {
    require (_quoteToken != address(0), "Invalid quote");
    quoteToken = _quoteToken;
    quoteDecimals = 18; // seems HONEY token pb, cant fetch decimals? ERC20(_quoteToken).decimals();
    setTradingFee(10); // initial trading fee: 0.1%
    setTreasury(msg.sender);
    constantProduct = TOTAL_SUPPLY * 10**quoteDecimals;
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
  function createToken(string memory name, string memory symbol, string memory desc, uint buyAmount) public {
    ERC20 newToken = new Token(name, symbol, desc, TOTAL_SUPPLY);
    balances[address(newToken)] = AmmBalances(newToken.balanceOf(address(this)), 0);
    tokens.push(address(newToken));
    emit LasCreationas(msg.sender, address(newToken));
    buy(address(newToken), buyAmount, 0);
  }
  
  
  /// @notice Get token amount bought 
  function getBuyAmount(address token, uint quoteAmount) public returns (uint buyAmount) {
    if (quoteAmount > 0) {
      uint fee = quoteAmount * tradingFee / 1e4;
      AmmBalances memory bals = balances[token];
      // baseBalanceBefore * quoteBalanceBefore = constantProduct = baseBalanceAfter * quoteBalanceAfter
      // so: baseBalanceAfter = baseBalanceBefore - buyAmount = constantProduct / quoteBalanceAfter
      buyAmount = bals.baseBalance - constantProduct / (bals.quoteBalance + quoteAmount - fee);
      require(buyAmount <= ERC20(token).balanceOf(address(this)), "Insufficient token balance");
    }
  }
  
  
  /// @notice Buy token, with minAmount to prevent excessive slippage
  function buy(address token, uint quoteAmount, uint minBoughtTokens) public returns (uint baseAmount){
    if (quoteAmount > 0) {
      ERC20(quoteToken).transferFrom(msg.sender, address(this), quoteAmount);
      uint fee = quoteAmount * tradingFee / 1e4;
      ERC20(quoteToken).transfer(treasury, fee);
      baseAmount = getBuyAmount(token, quoteAmount - fee);
      require(minBoughtTokens >= minBoughtTokens, "Excessive slippage");
      ERC20(token).transfer(msg.sender, baseAmount);
      
      balances[token].baseBalance -= baseAmount;
      balances[token].quoteBalance += quoteAmount - fee;
      emit LasBuyas(msg.sender, token, baseAmount);
      
      checkTokenLevel(token);
    }
  }
  
  
  /// @notice Get base amount from sale, before fee
  function _getAmountSale(address token, uint baseAmount) internal returns (uint quoteAmount) {
    AmmBalances memory bals = balances[token];
    quoteAmount = bals.quoteBalance - constantProduct / (bals.baseBalance + baseAmount);
    uint fee = quoteAmount * tradingFee / 1e4;
    quoteAmount -= fee;
  }
  
  
  /// @notice Get base token amount from sale
  function getAmountSale(address token, uint baseAmount) public returns (uint quoteAmount){
    if(baseAmount > 0){
      quoteAmount = _getAmountSale(token, baseAmount);
      quoteAmount = quoteAmount - (quoteAmount * tradingFee / 1e4);
    }
  }
  
  
  /// @notice Sell token amount 
  function sell(address token, uint baseAmount) public returns (uint quoteAmount) {
    if (baseAmount > 0){
      ERC20(token).transferFrom(msg.sender, address(this), baseAmount);
      uint quoteAmountBeforeFee = _getAmountSale(token, baseAmount);
      uint fee = quoteAmountBeforeFee * tradingFee / 1e4;
      quoteAmount  = quoteAmountBeforeFee - fee;
      ERC20(quoteToken).transfer(msg.sender, quoteAmount);
      ERC20(quoteToken).transfer(treasury, fee);

      balances[token].baseBalance += baseAmount;
      balances[token].quoteBalance -= quoteAmount;
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
      ERC20(quoteToken).approve(address(action), bals.quoteBalance / 5);
      ITokenAction(levelToAction[level+1]).doSomething(token, bals.baseBalance / 5, quoteToken, bals.quoteBalance / 5);
      tokenLevel[token] = level + 1;
    }
  }
}
