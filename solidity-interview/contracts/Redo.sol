// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
    struct Person {
        uint256 id;
        string name;
    }
    Person[] people;
    uint256 idx;
    mapping(uint256 => uint256) idxMapping;
    mapping(uint256 => bool) inserted;

    function create(string memory _name) public {
        uint256 _id = idx++;
        people.push(Person({id: _id, name: _name}));
        idxMapping[_id] = people.length - 1;
        inserted[_id] = true;
    }

    function remove(uint256 _id) public {
        require(inserted[_id], 'invalid id');
        uint256 _idx = idxMapping[_id];
        Person storage last = people[people.length - 1];
        people[_idx] = last;
        idxMapping[last.id] = _idx;
        delete idxMapping[_id];
        delete inserted[_id];
        people.pop();
    }

    function get(uint256 _id) public view returns(uint256 id, string memory name) {
        require(inserted[_id], 'invalid id');
        Person storage last = people[idxMapping[_id]];
        return (last.id, last.name);
    }
}