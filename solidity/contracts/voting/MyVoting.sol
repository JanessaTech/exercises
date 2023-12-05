// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyVoting {
    uint public unlockTime;

    struct Candidate {
        uint id;
        string name;
        string votedBy;
    }

    Candidate[] candidates;
    mapping(address => string) public names;
    
    constructor(uint _unlockTime) {
        require(block.timestamp < _unlockTime, 'Unlock time should be in the future' );
        unlockTime = _unlockTime;
        _initCandidates();
    }

    function _initCandidates() internal {
        candidates.push(Candidate({id: 0, name: 'Smith', votedBy: ''}));
        candidates.push(Candidate({id: 1, name: 'Janessa', votedBy: ''}));
        candidates.push(Candidate({id: 2, name: 'Miu Lees', votedBy: ''}));
        candidates.push(Candidate({id: 3, name: 'Johan Jin', votedBy:''}));
        candidates.push(Candidate({id: 4, name: 'Sephine coco', votedBy: ''}));
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory res = new Candidate[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            res[i] = candidates[i];
        }
        return res;
    }

    function registerName(string memory _name) public {
        names[msg.sender] = _name;
    }
    function getRegisterName() public view returns(string memory) {
        return names[msg.sender];
    }

    function vote(uint id) public {
        require(bytes(names[msg.sender]).length > 0, 'You must register name first');
        require(id < candidates.length, "Invalid id when voting");
        require(block.timestamp < unlockTime,"You cannot vote. Voting ended");
        Candidate storage candidate = candidates[id];
        require(bytes(candidate.votedBy).length == 0, "The candiate is already voted");
        string memory name = names[msg.sender];
        candidate.votedBy = name;
    }

    function isEnd() public view returns(bool) {
        return block.timestamp >= unlockTime;
    }

    function getCandidate(uint id) public view returns(uint, string memory, string memory) {
        require(id < candidates.length, "Invalid id when calling getCandidate");
        Candidate storage candidate = candidates[id];
        return (candidate.id, candidate.name, candidate.votedBy);
    }
}