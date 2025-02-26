// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract SimpleDAO {
    struct Proposal {
        string description;
        uint256 voteCnt;
        bool executed;
    }
    struct Member {
        address addr;
        uint256 since;
        uint256 balance;
    }

    uint256 totalSupply;
    Proposal[] proposals;
    mapping(address => Member) members;
    mapping(address => mapping(uint256 => bool)) votes;

    event CreateMember(address indexed from, address indexed member);
    event DeleteMember(address indexed from, address indexed member);
    event CreateProposal(address indexed from, uint256 id);
    event DeleteProposal(address indexed from, uint256 id);
    event Vote(address indexed from, uint256 id);
    event Execute(address indexed from, uint256 id);

    function createMember(address _member) public {
        require(_member != address(0), 'invald address');
        members[_member] = Member({
            addr: _member,
            since: block.timestamp,
            balance: 100
        });
        totalSupply += 100;
        
        emit CreateMember(msg.sender, _member);
    }

    function deleteMember(address _member) public {
        members[_member] = Member({
            addr: address(0),
            since: 0,
            balance: 0
        });
        totalSupply -= 100;

        emit DeleteMember(msg.sender, _member);
    }

    function createProposal(string memory des) public {
        proposals.push(Proposal({
            description: des,
            voteCnt: 0,
            executed: false
        }));

        emit CreateProposal(msg.sender, proposals.length - 1);
    }

    function deleteProposal(uint256 id) public {
        require(id < proposals.length, 'invalid id');
        Proposal storage last = proposals[proposals.length - 1];
        proposals[id] = Proposal({
            description: last.description,
            voteCnt: last.voteCnt,
            executed: last.executed
        });
        last.description = '';
        last.voteCnt = 0;
        last.executed = false;
        proposals.pop();

        emit DeleteProposal(msg.sender, id);
    }

    function vote(uint256 id, uint256 amount) public {
        require(members[msg.sender].addr != address(0), 'only valid member can vote');
        require(members[msg.sender].balance >= amount, 'not enough balance');
        require(id < proposals.length, 'invalid proposal id');
        require(proposals[id].executed == false, 'it is already done');
        require(votes[msg.sender][id] == false, 'you already voted');
        members[msg.sender].balance -= amount;
        proposals[id].voteCnt += amount;
        votes[msg.sender][id] = true;
        
        emit Vote(msg.sender, id);
    }

    function execute(uint256 id) public {
        require(id < proposals.length, 'invalid proposal id');
        require(proposals[id].executed == false, 'it is executed');
        require(proposals[id].voteCnt > totalSupply / 2, 'it is not approved by majority');
        proposals[id].executed = true;
        
        emit Execute(msg.sender, id);
    }

    function getMember(address _member) 
        public view 
            returns(
                address addr,
                uint256 since,
                uint256 balance) {
                    Member storage member = members[_member];
        return (member.addr, member.since, member.balance);
    }

    function getProposal(uint256 id) 
        public view returns(
            string memory description,
            uint256 voteCnt,
            bool executed
        ){
        require(id < proposals.length, 'invalid proposal id');
        Proposal storage proposal = proposals[id];
        return (proposal.description, proposal.voteCnt, proposal.executed);
    }
}