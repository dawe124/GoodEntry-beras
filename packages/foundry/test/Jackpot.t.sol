// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract Jackpot_Test is Test {
  TokenController public tokenController;
  
  fallback() external payable {}
  receive() external payable {}
  
  function setUp() public {
    tokenController = new TokenController();
    // disable lottery and only run the hourly jackpot
    assertEq(tokenController.isLotteryRunning(), true);
    tokenController.setLotteryRunning(false);
    assertEq(tokenController.isLotteryRunning(), false);
  }
  
  
  function test_HourlyJackpot() public {
    string memory name1 = "Las Beras1";
    string memory name2 = "Las Beras2";
    
    (address token1,) = tokenController.createToken(name1, name1, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    (address token2,) = tokenController.createToken(name2, name2, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    
    uint32 _hour = uint32(block.timestamp / 3600);
    assertEq(_hour, tokenController.hhour());
    
    tokenController.buy{value: 10e18}(token1, 0);
    assertEq(tokenController.hourlyJackpot(_hour), 10e18 / 1000 / 2);
    assertEq(tokenController.hourlyVolumeLeader(_hour), token1);
    assertEq(tokenController.getTokenHourlyVolume(token1, _hour), 10e18);
    tokenController.buy{value: 20e18}(token2, 0);
    assertEq(tokenController.hourlyJackpot(_hour), 3 * 10e18 / 1000 / 2);
    assertEq(tokenController.hourlyVolumeLeader(_hour), token2);
    assertEq(tokenController.getTokenHourlyVolume(token2, _hour), 20e18);

    vm.expectRevert("HJ: Round ongoing");
    tokenController.distributeHourlyJackpot(_hour);
    skip(3600);
    (,uint quote1) = tokenController.balances(token1);
    (,uint quote2) = tokenController.balances(token2);
    (address winner, uint jackpot) = tokenController.distributeHourlyJackpot(_hour);
    assertEq(jackpot, 15e15); // distrbuted all
    assertEq(winner, token2);
    (,uint quote1a) = tokenController.balances(token1);
    (,uint quote2a) = tokenController.balances(token2);
    assertEq(quote1a, quote1); // hasnt changed
    assertEq(quote2a, quote2 + jackpot); // received jackpot
    // tokens bought with jackpot were burnt
    assertGt(tokenController.TOTAL_SUPPLY(), ERC20(token2).totalSupply());
  }  
  
  function test_DailyJackpot() public {
    string memory name1 = "Las Beras1";
    string memory name2 = "Las Beras2";
    
    (address token1,) = tokenController.createToken(name1, name1, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    (address token2,) = tokenController.createToken(name2, name2, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    
    uint32 _today = uint32(block.timestamp / 86400);
    assertEq(_today, tokenController.today());
    
    tokenController.buy{value: 10e18}(token1, 0);
    assertEq(tokenController.dailyJackpot(_today), 10e18 / 1000 / 2);
    address[5] memory leaders = tokenController.getDailyVolumeLeaders(_today);
    assertEq(leaders[0], token1);
    assertEq(tokenController.getTokenDailyVolume(token1, _today), 10e18);
    tokenController.buy{value: 20e18}(token2, 0);
    assertEq(tokenController.dailyJackpot(_today), 3 * 10e18 / 1000 / 2);
    leaders = tokenController.getDailyVolumeLeaders(_today);
    assertEq(leaders[0], token2);
    assertEq(tokenController.getTokenDailyVolume(token2, _today), 20e18);

    vm.expectRevert("DJ: Round ongoing");
    tokenController.distributeDailyJackpot(_today);
    skip(86400);
    (,uint quote1) = tokenController.balances(token1);
    (,uint quote2) = tokenController.balances(token2);
    tokenController.distributeDailyJackpot(_today);
    
    (,uint quote2a) = tokenController.balances(token2);
    assertEq(quote2a, quote2 + 15e15 * 4 / 10); // received jackpot
    // tokens bought with jackpot were burnt
    assertGt(tokenController.TOTAL_SUPPLY(), ERC20(token2).totalSupply());
  }
  
  
}
