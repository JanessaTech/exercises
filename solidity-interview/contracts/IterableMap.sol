// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract IterableMap {
    struct UserMap {
        address[] keys;
        mapping(address => uint256) indexOf;
        mapping(address => uint256) values;
        mapping(address => bool) inserted;
    }

    UserMap map;

    function name() public pure returns(string memory) {
        return "IterableMap";
    }

    function get(address key) public view returns(uint256) {
        return map.values[key];
    }

    function getKeyAtIndex(uint256 index) 
        public 
        view 
        returns(address) {
            return map.keys[index];
    }

    function size() public view returns(uint256) {
        return map.keys.length;
    }

    function set(address key, uint256 value) public {
        if (map.inserted[key]) {
            map.values[key] = value;
        } else {
            map.inserted[key] = true;
            map.values[key] = value;
            map.indexOf[key] = map.keys.length;
            map.keys.push(key);
        }
    }

    function remove(address key) public {
        if (!map.inserted[key]) {
            return;
        }
        delete map.inserted[key];
        delete map.values[key];
        uint256 index = map.indexOf[key];
        address lastKey = map.keys[map.keys.length - 1];

        map.indexOf[lastKey] = index;
        delete map.indexOf[key];

        map.keys[index] = lastKey;
        map.keys.pop();
    }
}