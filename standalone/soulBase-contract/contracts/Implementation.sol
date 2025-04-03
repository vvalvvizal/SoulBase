// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";



contract Implementation is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 internal value;
    uint256 internal constant VERSION = 1;

    event ValueChanged(uint256 newValue);

  function initialize(uint256 _initialValue) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        value = _initialValue;
    }
    function setValue(uint256 newValue) external {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function retrieveValue() external view returns (uint256) {
        return value;
    }

    function version() public pure returns(uint256) {
        return VERSION;

    }
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}