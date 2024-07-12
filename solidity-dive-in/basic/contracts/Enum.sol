// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract EnumDemo {
    enum Season {
        Spring,
        Summer,
        Autumn,
        Winter
    }
    Season season;
    function set(Season _season) public {
        season = _season;
    }
    function get() public view returns(Season) {
        return season;
    }
    function reset() public {
        delete season;
    }
}