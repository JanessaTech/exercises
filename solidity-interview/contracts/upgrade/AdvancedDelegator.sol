// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

library StorageLib {
    struct StorageSlot {
        address value;
    }

    function get(bytes32 slot) internal pure returns(StorageSlot storage pointer) {
        assembly {
            pointer.slot := slot
        }
    }
}
contract AdvancedDelegator {
    uint256 public num;
    address public sender;
    uint256 public value;

    address payable owner;

    bytes32 private constant IMPLEMENTATION_SLOT = "implementation_slot";
    constructor() {
        owner = payable(msg.sender);
    }
    modifier isOwner() {
        require(msg.sender == owner, 'not owner');
        _;
    }

    function _getImplementation() private view returns(address) {
        StorageLib.StorageSlot storage data = StorageLib.get(IMPLEMENTATION_SLOT);
        return data.value;
    }

    function _setImplementation(address _implementation) private {
        StorageLib.StorageSlot storage data = StorageLib.get(IMPLEMENTATION_SLOT);
        data.value = _implementation;
    }

    function implementation() 
        external 
        view 
        isOwner returns(address) {
        return _getImplementation();
    }

    function upgradeTo(address _implementation) external isOwner {
        _setImplementation(_implementation);
    }

    function setVars(uint256 _num) external payable {
        address target = _getImplementation();
        (bool success, ) = target.delegatecall(abi.encodeWithSignature("setVars(uint256)", _num));
        require(success, 'failed to call delegatecall');
    }
    function getName() external view returns(string memory) {
        address target = _getImplementation();
        //(bool success, ) = target.delegatecall(abi.encodeWithSignature("getName()"));
        //require(success, 'failed to call delegatecall');
        //return abi.decode(res, (string));
        return 'aa';
    }

    receive() external payable {}
    fallback() external payable {}
}