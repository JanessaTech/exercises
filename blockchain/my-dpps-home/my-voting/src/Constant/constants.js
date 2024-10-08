const Candidate = "(uint id, string name, string votedBy)"
export const abi = [
    "constructor(uint _unlockTime) payable",
    `function getCandidates() public view returns (${Candidate}[])`,
    "function registerName(string memory _name) public",
    "function getRegisterName() public view returns(string)",
    "function vote(uint id) public",
    "function isEnd() public view returns(bool)",
    "function getCandidate(uint id) public view returns(uint, string memory, string memory)",
    "function reset() public"
]

export const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
//export const contractAddr = '0x699d3a6904aa59f59ddcbc2bdfd8989e88ac722f'  // the address on Sepolia 