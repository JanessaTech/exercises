
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DataLocations {

    struct Stu {
        string name;
        uint age;
    }
    mapping(uint => Stu) stus;

    function addStu(string calldata _name, uint id, uint age) public {
        _add(_name, id, age);
    }

    function _add(string calldata _name, uint id, uint age) private {
        stus[id] = Stu({name: _name, age: age});
    }

    function getStu(uint id) public view returns(string memory, uint) {
        Stu storage stu = stus[id];
        return (stu.name, stu.age);
    }

}