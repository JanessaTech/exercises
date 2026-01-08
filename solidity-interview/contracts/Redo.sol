// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

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
        uint256 _idx = idx++;
        people.push(Person({id: _idx, name: _name}));
        idxMapping[_idx] = people.length - 1;
        inserted[_idx] = true;
    }

    function remove(uint256 _id) public {
        require(inserted[_id], 'invalid id');
        uint _idx = idxMapping[_id];
        Person storage last = people[people.length - 1];
        if (last.id != _id) {
            people[_idx] = last;
            idxMapping[last.id] = _idx;
        }
        people.pop();
        delete idxMapping[_id];
        delete inserted[_id];
    }

    function get(uint256 _id) public view returns(uint256 id, string memory name) {
        require(inserted[_id], 'invalid id');
        Person storage person = people[idxMapping[_id]];
        return (person.id, person.name);
    }
}