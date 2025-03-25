// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
   struct Person {
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

   function remove(uint _id) public {
      require(inserted[_id], 'invalid id');
      uint _idx = idxMapping[_id];
      Person storage last = persons[persons.length - 1];
      persons[_idx] = Person({id: last.id, name: last.name});
      idxMapping[last.id] = _idx;
      delete idxMapping[_id];
      delete inserted[_id];
      persons.pop();
   }
   function get(uint _id) public view returns(uint id, string memory name) {
      require(inserted[_id], 'invalid id');
      Person storage person = persons[idxMapping[_id]];
      return (person.id, person.name);
   }

   function getAll() public view returns(Person[] memory){
      return persons;
   }
}
