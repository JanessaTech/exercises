// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo {
    struct Person {
        uint256 id;
        string name;
    }
    uint idx;
    Person[] people;
    mapping(uint => uint) idxMapping;
    mapping(uint => bool) inserted;

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
    }
    function get(uint256 _id) public view returns(uint id, string memory name) {
        require(inserted[_id], 'invalid id');
        Person storage person = people[idxMapping[_id]];
        return (person.id, person.name);
    }
}