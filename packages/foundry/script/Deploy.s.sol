//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../contracts/TokenController.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  error InvalidPrivateKey(string);
  
  address internal constant HONEY = 0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B;

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
    TokenController tokenController = new TokenController();
    console.log("TokenController", address(tokenController));
    // create initial token, useful to populate contract abi
    tokenController.createToken("Las Beras", "Las Beras", '{"img":"QmX2Mbm1s9DPCgSyDisC1SiWM4ZnXYcKqCviwvPErZRaaX","desc":"Beras ipsum dolor sit amet."}');
  }
}
