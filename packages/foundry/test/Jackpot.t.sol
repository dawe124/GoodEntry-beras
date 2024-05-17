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
  
  
  function test_Jackpot() public {
    string memory name1 = "Las Beras1";
    string memory name2 = "Las Beras2";
    
    (address token1,) = tokenController.createToken(name1, name1, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    (address token2,) = tokenController.createToken(name2, name2, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    
    uint32 _hour = uint32(block.timestamp / 3600);
    assertEq(_hour, tokenController.hhour());
    
    tokenController.buy{value: 10e18}(token1, 0);
    assertEq(tokenController.hourlyJackpot(_hour), 10e18 / 1000);
    assertEq(tokenController.hourlyVolumeLeader(_hour), token1);
    assertEq(tokenController.getTokenHourlyVolume(token1, _hour), 10e18);
    tokenController.buy{value: 20e18}(token2, 0);
    assertEq(tokenController.hourlyJackpot(_hour), 3 * 10e18 / 1000);
    assertEq(tokenController.hourlyVolumeLeader(_hour), token2);
    assertEq(tokenController.getTokenHourlyVolume(token2, _hour), 20e18);

    vm.expectRevert("HJ: Round not over");
    tokenController.distributeHourlyJackpot(_hour);
    skip(3600);
    (,uint quote1) = tokenController.balances(token1);
    (,uint quote2) = tokenController.balances(token2);
    (address winner, uint jackpot) = tokenController.distributeHourlyJackpot(_hour);
    assertEq(jackpot, 3e16);
    assertEq(winner, token2);
    (,uint quote1a) = tokenController.balances(token1);
    (,uint quote2a) = tokenController.balances(token2);
    assertEq(quote1a, quote1); // hasnt changed
    assertEq(quote2a, quote2 + 3e16); // received jackpot
    
  }  
  
  
}
