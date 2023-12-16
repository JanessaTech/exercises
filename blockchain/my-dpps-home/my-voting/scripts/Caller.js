/**
 * This is the experimental codes on how to interact with MyVoting.sol deployed on hardhat
 */

const { ethers } = require("ethers");

// Pls make sure hardhat is started on local listening at 8545
const  provider = new ethers.JsonRpcProvider();  // connect to http://localhost:8545 by default

// Make sure account1 exists in Hardhat when it is started. If not, update them accordingly
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // the first account given by local hardhat
const privateKey1 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'  // the private key for account1
const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3' // assume you have deployed the MyVoting.sol at this address （local hardhat）

const signer = new ethers.Wallet(privateKey1, provider)
const Candidate = "(uint id, string name, string votedBy)"
const abi = [
    "constructor(uint _unlockTime) payable",
    `function getCandidates() public view returns (${Candidate}[])`,
    "function registerName(string memory _name) public",
    "function getRegisterName() public view returns(string)",
    "function vote(uint id) public",
    "function isEnd() public view returns(bool)",
    "function getCandidate(uint id) public view returns(uint, string memory, string memory)"
]

const myVotingReadOnly = new ethers.Contract(contractAddr, abi, provider)
const myVoting = myVotingReadOnly.connect(signer)

const GetCandidates = async () => {
    const res = await myVotingReadOnly.getCandidates();
    console.log(res)
}
const GetCandidate = async () => {
    const res = await myVotingReadOnly.getCandidate(0);
    console.log(res)
}
const RegisterName = async () => {
    const tx = await myVoting.registerName("account1")
    console.log(tx)
    const name = await myVotingReadOnly.getRegisterName();
    console.log("name = ", name)
}
const IsEnd = async () => {
    const res = await myVotingReadOnly.isEnd();
    console.log("res = ", res)
}
const Vote = async () => {
    const tx = await myVoting.vote(2)
    console.log(tx)
    const res = await myVotingReadOnly.getCandidate(2)
    console.log(res)
}

GetCandidates()
//GetCandidate()
//RegisterName()
//IsEnd()
//Vote()




