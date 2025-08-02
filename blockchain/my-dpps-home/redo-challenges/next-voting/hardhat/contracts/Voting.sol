// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    address owner;

    bool started;
    bool ended;

    struct Candidate {
        uint id;
        string name;
        address votedBy;
    } 

    Candidate[] candidates;

    event Vote(address indexed from, uint id);
    event Unvote(address indexed from, uint id);

    constructor(string[] memory names) {
        owner = msg.sender;
        for (uint i = 0; i < names.length; i++) {
            candidates.push(Candidate({id: i, name: names[i], votedBy: address(0)}));
        }
    }

    modifier isOwner() {
        require(msg.sender == owner, 'not owner');
        _;
    }

    function start() public isOwner{
        require(!started, 'started');
        started = true;
    }
    function end() public isOwner{
        require(started, 'not started');
        require(!ended, 'ended');
        ended = true;
    }

    function vote(uint id)  public {
        require(started, 'Not started');
        require(!ended, 'ended');
        require(id < candidates.length, 'invalid id');
        Candidate storage candidate = candidates[id];
        require(candidate.votedBy == address(0), 'already voted');
        candidate.votedBy = msg.sender;

        emit Vote(msg.sender, id);
    }

    function unvote(uint id) public {
        require(started, 'Not started');
        require(!ended, 'ended');
        require(id < candidates.length, 'invalid id');
        Candidate storage candidate = candidates[id];
        require(candidate.votedBy == msg.sender, 'not allow to unvote');
        candidate.votedBy = address(0);

        emit Unvote(msg.sender, id);
    }

    function isStarted() public view returns(bool) {
        return started;
    }
    function isEnded() public view returns(bool) {
        return ended;
    }
    function getCandidates() public view returns(Candidate[] memory) {
        return candidates;
    }
}