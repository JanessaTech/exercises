// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Voting {
    address public owner;

    uint256 startAt;
    uint256 endAt;
    bool started;
    bool ended;
    uint256 duration;

    struct Candidate {
        uint256 id;
        string name;
        bool voted;
        address votedBy;
    }

    uint256 candidateId;
    Candidate[] candidates;
    mapping(uint256 => uint256) candidateIdx;  //id => idx
    mapping(uint256 => bool) inserted; // id => inserted
    
    mapping (address=>mapping(uint256=> bool)) votes;

    event Start(address indexed from);
    event End(address indexed from);
    event CreateCandidate(address indexed from, uint256 id);
    event RemoveCandidate(address indexed from, uint256 id);
    event Vote(address indexed from, uint256 id);
    event Unvote(address indexed from, uint256 id);

    constructor(uint256 _duration) {
        owner = msg.sender;
        duration = _duration;
    }

    modifier IsOwner() {
        require(msg.sender == owner, 'not owner');
        _;
    }

    modifier Started() {
        require(started, 'not started');
        _;
    }
    modifier NotStarted() {
        require(!started, 'started');
        _;
    }
    modifier NotEnd() {
        require(block.timestamp < endAt, 'ended');
        _;
    }

    function start() public IsOwner {
        require(!started, 'already started');
        startAt = block.timestamp;
        endAt = startAt + duration;
        started = true;

        emit Start(msg.sender);
    }

    function end() public IsOwner {
        require(block.timestamp >= endAt, 'not ended');
        require(!ended, 'already ended');
        endAt = block.timestamp;
        ended = true;

        emit End(msg.sender);
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function createCandidate(string memory _name) 
        public 
        IsOwner
        NotStarted {
        uint256 id = candidateId;
        candidateId++;
        candidates.push(Candidate({
            id: id,
            name: _name,
            voted: false,
            votedBy: address(0)
        }));
        candidateIdx[id] = candidates.length - 1;
        inserted[id] = true;

        emit CreateCandidate(msg.sender, id);
        }
    function removeCandidate(uint256 id) 
        public 
        IsOwner
        NotStarted {
        require(inserted[id], 'invalid candidate');
        uint256 idx = candidateIdx[id];
        Candidate storage last = candidates[candidates.length - 1];
        candidates[idx] = Candidate({
            id: last.id,
            name: last.name,
            voted: last.voted,
            votedBy: last.votedBy
        });
        candidateIdx[last.id] = idx;
        inserted[id] = false;

        delete candidateIdx[id];
        candidates.pop();
        delete inserted[id];

        emit RemoveCandidate(msg.sender, id);
        }

    function vote(uint256 id) 
        public 
        Started
        NotEnd {
        require(inserted[id], 'invalid id');
        require(votes[msg.sender][id] == false, 'you voted');
        uint idx = candidateIdx[id];
        require(candidates[idx].voted == false, 'candidated is voted');
        candidates[idx].voted = true;
        candidates[idx].votedBy = msg.sender;
        votes[msg.sender][id] = true;

        emit Vote(msg.sender, id);
    }

    function unvote(uint256 id) 
        public 
        Started
        NotEnd {
            require(inserted[id], 'invalid id');
            require(votes[msg.sender][id], 'you did not vote');
            uint idx = candidateIdx[id];
            votes[msg.sender][id] = false;
            candidates[idx].voted = false;
            candidates[idx].votedBy = address(0);

            emit Unvote(msg.sender, id);
    }

    function getAllCandidates() public view returns(Candidate[] memory) {
        return candidates;
    }

    function getCandidate(uint256 _id) 
        public view returns(uint256 id,
                            string memory name,
                            bool voted,
                            address votedBy) {
        require(inserted[_id], 'invalid id');
        uint256 idx = candidateIdx[_id];
        Candidate storage candidate = candidates[idx];
        return (
            candidate.id, candidate.name, candidate.voted, candidate.votedBy
        );
    }

    function checkStarted() public view returns(bool) {
        return started;
    }
    function checkEnded() public view returns(bool) {
        return ended;
    }
}