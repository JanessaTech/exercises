pragma solidity ^0.5.16;

contract Students {
    mapping (string => uint) students;
    constructor() public {}

    event registerOneStudent(string  name, uint age);

    function register(string memory name, uint age) public returns(bool exists) {
        if (students[name] <= 0) return false;
        students[name] = age;
        emit registerOneStudent(name, age);
        return true;
    }

    function getStudent(string memory name) public view returns(uint) {
        return students[name];
    }
}