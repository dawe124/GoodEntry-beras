//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../contracts/TokenController.sol";
import "./DeployHelpers.s.sol";

contract Deploy_Arbitrum_Script is ScaffoldETHDeploy {
  error InvalidPrivateKey(string);
  
  // Arbitrum Camelot v2 router
  address public constant ammRouter = 0xc873fEcbd354f5A56E00E710B90EF4201db2448d;
  

  function run() external {
    uint256 deployerPrivateKey = setupLocalhostEnv();
    if (deployerPrivateKey == 0) {
      revert InvalidPrivateKey(
        "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
      );
    }
    vm.startBroadcast(deployerPrivateKey);
    deploy();
    vm.stopBroadcast();
    
    /**
     * This function generates the file containing the contracts Abi definitions.
     * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
     * This function should be called last.
     */
    exportDeployments();
  }

  function test() public {}
  
  function deploy() public {
    TokenController tokenController = new TokenController(ammRouter);
    tokenController.setLotteryRunning(false);
    console.log("TokenController", address(tokenController));
    // create initial token
    //tokenController.createToken("Good Entry", "Good Entry", '{"img":"QmX2Mbm1s9DPCgSyDisC1SiWM4ZnXYcKqCviwvPErZRaaX","desc":"Feels good man."}');
  }
}