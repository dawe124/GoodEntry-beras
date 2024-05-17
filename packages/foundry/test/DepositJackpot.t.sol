// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract DepositJackpot_Test is Test, TokenController {
  TokenController public tokenController;
  
  
  function testfuzz_depositJackpotsWLottery(uint amount) public {
    vm.assume(amount < 1e10 ether);
    uint baseShare = amount / 5;
    _depositJackpots(amount);
    assertEq(hourlyJackpot[hhour()], amount - 3 * baseShare);
  }
  
  function testfuzz_depositJackpotsWithNoLottery(uint amount) public {
    vm.assume(amount < 1e10 ether);
    isLotteryRunning = false;
    _depositJackpots(amount);
    assertEq(hourlyJackpot[hhour()], amount);
  }
}