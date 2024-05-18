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
    uint32 round = today();
    address[5] storage top = dailyVolumeLeaders[round];
 
    assertEq(top[0], address(0));

    //set initial token = add before
    tokenDailyVolume[DUMMY0][round] = 1e18;
    _updateTop5(DUMMY0, 1e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY0);
    assertEq(dailyVolumeLeaders[round][1], address(0));
    
    // add before
    tokenDailyVolume[DUMMY1][round] = 5e18;
    _updateTop5(DUMMY1, 5e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY1);
    assertEq(dailyVolumeLeaders[round][1], DUMMY0);
    
    // add between
    tokenDailyVolume[DUMMY2][round] = 3e18;
    _updateTop5(DUMMY2, 3e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY1);
    assertEq(dailyVolumeLeaders[round][1], DUMMY2);
    assertEq(dailyVolumeLeaders[round][2], DUMMY0);
    
    // insert the same but change after increase mcap
    tokenDailyVolume[DUMMY2][round] = 10e18;
    _updateTop5(DUMMY2, 10e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY2);
    assertEq(dailyVolumeLeaders[round][1], DUMMY1);
    assertEq(dailyVolumeLeaders[round][2], DUMMY0);
    
    // add at the end 
    tokenDailyVolume[DUMMY3][round] = 1e17;
    _updateTop5(DUMMY3, 1e17);
    assertEq(dailyVolumeLeaders[round][0], DUMMY2);
    assertEq(dailyVolumeLeaders[round][1], DUMMY1);
    assertEq(dailyVolumeLeaders[round][2], DUMMY0);
    assertEq(dailyVolumeLeaders[round][3], DUMMY3);
    
    // add at the end 
    tokenDailyVolume[DUMMY4][round] = 1e16;
    _updateTop5(DUMMY4, 1e17);
    assertEq(dailyVolumeLeaders[round][0], DUMMY2);
    assertEq(dailyVolumeLeaders[round][1], DUMMY1);
    assertEq(dailyVolumeLeaders[round][2], DUMMY0);
    assertEq(dailyVolumeLeaders[round][3], DUMMY3);
    assertEq(dailyVolumeLeaders[round][4], DUMMY4);
    
    // between 
    tokenDailyVolume[DUMMY5][round] = 2e18;
    _updateTop5(DUMMY5, 2e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY2);
    assertEq(dailyVolumeLeaders[round][1], DUMMY1);
    assertEq(dailyVolumeLeaders[round][2], DUMMY5);
    assertEq(dailyVolumeLeaders[round][3], DUMMY0);
    assertEq(dailyVolumeLeaders[round][4], DUMMY3);
    
    // bef 
    tokenDailyVolume[DUMMY4][round] = 20e18;
    _updateTop5(DUMMY4, 20e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY4);
    assertEq(dailyVolumeLeaders[round][1], DUMMY2);
    assertEq(dailyVolumeLeaders[round][2], DUMMY1);
    assertEq(dailyVolumeLeaders[round][3], DUMMY5);
    assertEq(dailyVolumeLeaders[round][4], DUMMY0);
    
    // beween 
    tokenDailyVolume[DUMMY5][round] = 9e18;
    _updateTop5(DUMMY5, 9e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY4);
    assertEq(dailyVolumeLeaders[round][1], DUMMY2);
    assertEq(dailyVolumeLeaders[round][2], DUMMY5);
    assertEq(dailyVolumeLeaders[round][3], DUMMY1);
    assertEq(dailyVolumeLeaders[round][4], DUMMY0);

  }

}
