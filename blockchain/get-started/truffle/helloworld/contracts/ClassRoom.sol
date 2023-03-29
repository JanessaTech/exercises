pragma solidity ^0.5.16;

contract ClassRoom {
    string name;
    constructor() public {
        name = "room1";
    }

    function setRoomName(string memory roomName) public {
        name = roomName;
    }

    function getRoomName() public view returns(string memory) {
        return name;
    }
}