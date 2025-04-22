// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Redo {
    struct Person{
        uint id;
        string name;
    }

    uint idx;
    Person[] persons;
    mapping(uint => uint) idxMapping;
    mapping(uint => bool) inserted;

    function create(string memory _name) public {
        uint _id = idx;
        idx++;
        persons.push(Person({id: _id, name: _name}));
        idxMapping[_id] = persons.length - 1;
        inserted[_id] = true;
    }

    function get(uint _id) public view returns(uint id, string memory name) {
        require(inserted[_id], 'invalid id');
        Person storage person = persons[idxMapping[_id]];
        return (person.id, person.name);
    }
}
