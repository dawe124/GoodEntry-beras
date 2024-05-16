// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract UpdateTop5_Test is Test, TokenController {
  TokenController public tokenController;
  address internal DUMMY0 = 0x0000000000000000000000000000000000011000;
  address internal DUMMY1 = 0x0000000000000000000000000000000000000001;
  address internal DUMMY2 = 0x0000000000000000000000000000000000000002;
  address internal DUMMY3 = 0x0000000000000000000000000000000000000003;
  address internal DUMMY4 = 0x0000000000000000000000000000000000000004;
  address internal DUMMY5 = 0x0000000000000000000000000000000000000005;
  
  address internal token;
  
  fallback() external payable {}
  receive() external payable {}


  function test_UpdateTop5() public {
    uint64 round = today() + 1;
    address[5] storage top = tokenDailyLotteryLeaders[round];
    // set all payoutPerTicket
    tokenDailyLotterySettings[DUMMY0][round].payoutPerTicket = 1e18;
    tokenDailyLotterySettings[DUMMY1][round].payoutPerTicket = 1e18;
    tokenDailyLotterySettings[DUMMY2][round].payoutPerTicket = 1e18;
    tokenDailyLotterySettings[DUMMY3][round].payoutPerTicket = 1e18;
    tokenDailyLotterySettings[DUMMY4][round].payoutPerTicket = 1e18;
    tokenDailyLotterySettings[DUMMY5][round].payoutPerTicket = 1e18;
    
    assertEq(top[0], address(0));

    //set initial token = add before
    tokenDailyLotterySettings[DUMMY0][round].totalOI = 1e18;
    _updateTop5(DUMMY0, 1e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY0);
    assertEq(tokenDailyLotteryLeaders[round][1], address(0));
    
    // add before
    tokenDailyLotterySettings[DUMMY1][round].totalOI = 5e18;
    _updateTop5(DUMMY1, 5e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY0);
    
    // add between
    tokenDailyLotterySettings[DUMMY2][round].totalOI = 3e18;
    _updateTop5(DUMMY2, 3e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY0);
    
    // insert the same but change after increase mcap
    tokenDailyLotterySettings[DUMMY2][round].totalOI = 10e18;
    _updateTop5(DUMMY2, 10e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY0);
    
    // add at the end 
    tokenDailyLotterySettings[DUMMY3][round].totalOI = 1e17;
    _updateTop5(DUMMY3, 1e17);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY0);
    assertEq(tokenDailyLotteryLeaders[round][3], DUMMY3);
    
    // add at the end 
    tokenDailyLotterySettings[DUMMY4][round].totalOI = 1e16;
    _updateTop5(DUMMY4, 1e17);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY0);
    assertEq(tokenDailyLotteryLeaders[round][3], DUMMY3);
    assertEq(tokenDailyLotteryLeaders[round][4], DUMMY4);
    
    // between 
    tokenDailyLotterySettings[DUMMY5][round].totalOI = 2e18;
    _updateTop5(DUMMY5, 2e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY5);
    assertEq(tokenDailyLotteryLeaders[round][3], DUMMY0);
    assertEq(tokenDailyLotteryLeaders[round][4], DUMMY3);
    
    // bef 
    tokenDailyLotterySettings[DUMMY4][round].totalOI = 20e18;
    _updateTop5(DUMMY4, 20e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY4);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][3], DUMMY5);
    assertEq(tokenDailyLotteryLeaders[round][4], DUMMY0);
    
    // beween 
    tokenDailyLotterySettings[DUMMY5][round].totalOI = 9e18;
    _updateTop5(DUMMY5, 9e18);
    assertEq(tokenDailyLotteryLeaders[round][0], DUMMY4);
    assertEq(tokenDailyLotteryLeaders[round][1], DUMMY2);
    assertEq(tokenDailyLotteryLeaders[round][2], DUMMY5);
    assertEq(tokenDailyLotteryLeaders[round][3], DUMMY1);
    assertEq(tokenDailyLotteryLeaders[round][4], DUMMY0);

  }

}
