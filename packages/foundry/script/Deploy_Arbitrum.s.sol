//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../contracts/TokenController.sol";
import "./DeployHelpers.s.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract Deploy_Arbitrum_Script is ScaffoldETHDeploy {
  error InvalidPrivateKey(string);
  
  // Arbitrum Camelot v2 router
  address public constant ammRouter = 0xc873fEcbd354f5A56E00E710B90EF4201db2448d;
  
  TransparentUpgradeableProxy proxy = TransparentUpgradeableProxy(payable(0x00b9C39788d876DD710dAA897046fC9b6B56cF18));
  ProxyAdmin proxyAdmin = ProxyAdmin(0x7D477b504Ff15f16251f3b0ef5aAA4680e431116);

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
    TokenController tokenController = TokenController(0x43f6e9D437d1d6029a8a160aF304D0E0DF8D9B5B); //new TokenController(ammRouter);
    proxyAdmin = new ProxyAdmin();
    proxy = new TransparentUpgradeableProxy(address(tokenController), address(proxyAdmin), "");
    TokenController(address(proxy)).initialize(ammRouter);
    
    TokenController(address(proxy)).setLotteryRunning(false);
    console.log("TokenController", address(tokenController));
    // create initial token
    //tokenController.createToken("Good Entry", "Good Entry", '{"img":"QmX2Mbm1s9DPCgSyDisC1SiWM4ZnXYcKqCviwvPErZRaaX","desc":"Feels good man."}');
  }
  
  function upgradeTokenController() public {
    TokenController tokenController = new TokenController(ammRouter);
    proxyAdmin.upgrade(proxy, address(tokenController));
  }
}