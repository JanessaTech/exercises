const Candidate = "(uint id, string name, address votedBy)"
export const abi = [
    "constructor(string[] memory names)",
    "function vote(uint id)  public",
    "function unvote(uint id) public",
    "function isStarted() public view returns(bool)",
    "function isEnded() public view returns(bool)",
    `function getCandidates() public view returns(${Candidate}[] memory)`,
    ]

export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
//export const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'