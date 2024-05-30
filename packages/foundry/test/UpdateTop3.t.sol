// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract UpdateTop3_Test is Test, TokenController {
  TokenController public tokenController;
  
  // Arbitrum Camelot v2 router
  address public constant _ammRouter = 0xc873fEcbd354f5A56E00E710B90EF4201db2448d;
  
  address internal DUMMY0 = 0x0000000000000000000000000000000000011000;
  address internal DUMMY1 = 0x0000000000000000000000000000000000000001;
  address internal DUMMY2 = 0x0000000000000000000000000000000000000002;
  address internal DUMMY3 = 0x0000000000000000000000000000000000000003;
  address internal DUMMY4 = 0x0000000000000000000000000000000000000004;
  address internal DUMMY5 = 0x0000000000000000000000000000000000000005;
  
  address internal token;
  
  fallback() external payable {}
  receive() external payable {}
  
  
  constructor() TokenController(_ammRouter) {}


  function test_UpdateTop3() public {
    uint32 round = today();
    address[3] storage top = dailyVolumeLeaders[round];
 
    assertEq(top[0], address(0));

    //set initial token = add before
    tokenDailyVolume[DUMMY0][round] = 1e18;
    _updateTop3(DUMMY0, 1e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY0);
    assertEq(dailyVolumeLeaders[round][1], address(0));
    
    // add before
    tokenDailyVolume[DUMMY1][round] = 5e18;
    _updateTop3(DUMMY1, 5e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY1);
    assertEq(dailyVolumeLeaders[round][1], DUMMY0);
    
    // add between
    tokenDailyVolume[DUMMY2][round] = 3e18;
    _updateTop3(DUMMY2, 3e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY1);
    assertEq(dailyVolumeLeaders[round][1], DUMMY2);
    assertEq(dailyVolumeLeaders[round][2], DUMMY0);
    
    // insert the same but change after increase mcap
    tokenDailyVolume[DUMMY2][round] = 10e18;
    _updateTop3(DUMMY2, 10e18);
    assertEq(dailyVolumeLeaders[round][0], DUMMY2);
    assertEq(dailyVolumeLeaders[round][1], DUMMY1);
    assertEq(dailyVolumeLeaders[round][2], DUMMY0);
  }

}
