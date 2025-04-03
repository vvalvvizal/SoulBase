// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ImplementationV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 internal value;
    uint256 internal constant VERSION = 2;

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

    function version() public pure returns (uint256) {
        return VERSION;
    }

    /**
     * @dev New function added in V2
     */
    function doubleValue() public returns (uint256) {
        value = value * 2; // 버그 수정 (기존 코드에서는 * 1 이라서 변화 없음)
        return value;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
