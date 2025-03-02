// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {

    event Set(address indexed key, string value);
    event Update(address indexed key, string value);

    struct CustomMap {
        address[] keys;
        mapping(address => uint) idxMapping;
        mapping(address => string) values;
        mapping(address => bool) inserted;
    }

    CustomMap myMap;

    function set(address key, string memory value) public {
        if (myMap.inserted[key]) {
            //update
            myMap.values[key] = value;
            emit Update(key, value);
        } else {
            myMap.keys.push(key);
            myMap.idxMapping[key] = myMap.keys.length - 1;
            myMap.inserted[key] = true;
            myMap.values[key] = value;
            emit Set(key, value);
        }
    }

    function remove(address key) public {
        require(myMap.inserted[key], 'invalid key');
        uint idx = myMap.idxMapping[key];
        address last = myMap.keys[myMap.keys.length - 1];
        myMap.keys[idx] = last;
        delete myMap.idxMapping[key];
        delete myMap.values[key];
        delete myMap.inserted[key];
        myMap.keys.pop();
    }

    function getValue(address key) public view returns(string memory) {
        require(myMap.inserted[key], 'invalid key');
        return myMap.values[key];
    }

    function getKeys() public view returns(address[] memory) {
        return myMap.keys;
    }
}
