//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../interfaces/ITokenAction.sol";
import "../interfaces/IBeraDex.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/// @notice Send a share of tokens to an AMM
/// @dev Bera ERC20 DEX	0x0D5862FDBDD12490F9B4DE54C236CFF63B038074
contract DepositAmm is ITokenAction {
  address public ammRouter;
  
  constructor (address _ammRouter){
    require(_ammRouter != address(0), "Invalid address");
    ammRouter = _ammRouter;
  }

  /// @notice Main action is to deposit 
  function doSomething(address baseToken, uint baseAmount, address quoteToken, uint quoteAmount) public {
    address[] memory assetsIn = new address[](2);
    uint[] memory amountsIn = new uint[](2);
    assetsIn[0] = baseToken;
    amountsIn[0] = baseAmount;
    assetsIn[1] = quoteToken;
    amountsIn[1] = quoteAmount;
  
    BeraDex.AssetWeight[] memory weights = new BeraDex.AssetWeight[](2);
    weights[0] = BeraDex.AssetWeight(baseToken, 1);
    weights[1] = BeraDex.AssetWeight(quoteToken, 1);
  
    BeraDex(ammRouter).createPool(
      string(abi.encode(ERC20(baseToken).symbol(), "-", ERC20(baseToken).symbol())),
      assetsIn,
      amountsIn,
      "balancer",
      BeraDex.PoolOptions(weights, 300)
    );
  }
}