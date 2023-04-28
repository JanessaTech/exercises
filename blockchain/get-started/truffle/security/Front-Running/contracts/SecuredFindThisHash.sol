pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED

contract SecuredFindThisHash  {
    bytes32 public hash = 0x564ccaf7594d66b1eaaea24fe01f0585bf52ee70852af4eac0cc4b04711cd0e2;
    struct Commit {
        bytes32 solutionHash;
        uint commitTime;
        bool revealed;
    }
    event trackbytes32(string name, bytes32 data);

    uint public reward;
    address public winner;
    bool public ended;
    mapping(address => Commit) commits;

    constructor() payable {
        reward = msg.value;
    }

    modifier gameActive() {
        require(!ended, "Game is ended!");
        _;
    }

    function commitSolution(bytes32 _solutionHash) public gameActive {
        Commit storage commit = commits[msg.sender];
        require(commit.commitTime == 0, "Already committed");
        commit.solutionHash = _solutionHash;
        commit.commitTime = block.timestamp;
        commit.revealed = false;
    }

    function getMysolution() public view gameActive returns(bytes32, uint, bool) {
        Commit storage commit = commits[msg.sender];
        require(commit.commitTime != 0, "Not yet committed");
        return (commit.solutionHash, commit.commitTime, commit.revealed);
    }

    function printSolutionHash(string memory _solution, string memory _secret) public  gameActive {
        bytes32 solutionHash = keccak256(abi.encodePacked(abi.encodePacked(msg.sender), _solution, _secret));
        emit trackbytes32("printSolutionHash", solutionHash);
    }

    function printEncodeSolution(string memory _solution) public  gameActive {
        bytes32 encodeSolution = keccak256(abi.encodePacked(_solution));
        emit trackbytes32("printEncodeSolution", encodeSolution);
    }

    function revealSolution(string memory _solution, string memory _secret) public gameActive {
        Commit storage commit = commits[msg.sender];
        require(commit.commitTime != 0, "Not yet committed");
        require(commit.commitTime < block.timestamp, "Cannot reveal in the same block");
        require(!commit.revealed, "Already commited and revealed");
        bytes32 solutionHash = keccak256(abi.encodePacked(abi.encodePacked(msg.sender), _solution, _secret));
        emit trackbytes32("solutionHash", solutionHash);
        require(solutionHash == commit.solutionHash, "Hash doesn't match");
        bytes32 encodeSolution = keccak256(abi.encodePacked(_solution));
        emit trackbytes32("encodeSolution", encodeSolution);
        require(encodeSolution == hash, "Incorrect answer");

        winner = msg.sender;
        ended = true;
        (bool sent, ) = payable(msg.sender).call{value: reward}("");
        if (!sent) {
            winner = address(0);
            ended = false;
            revert("Failed to send ether.");
        }
    }
}