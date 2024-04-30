//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


interface BeraDex {
  function createPool(
      string memory name,
      address[] memory assetsIn,
      uint256[] memory amountsIn,
      string memory poolType,
      PoolOptions memory options
  ) external payable returns (address);
  
  struct PoolOptions {
    AssetWeight[] weights;
    uint256 swapFee;
  }

  struct AssetWeight {
    address asset;
    uint256 weight;
  }
}