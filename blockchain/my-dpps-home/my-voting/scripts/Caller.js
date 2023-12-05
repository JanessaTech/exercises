const { ethers } = require("ethers");

const  provider = new ethers.providers.JsonRpcProvider();

// Make sure the following accounts exist in Hardhat when it is started. If not, update them accordingly
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // the first account given by local hardhat
const account2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' // the second account given by local hardhat
const contractAddr = '0x5fbdb2315678afecb367f032d93f642f64180aa3' // assume you have deployed the following contract at this address （local）

const privateKey1 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const privateKey2 = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'

const signer = new ethers.Wallet(privateKey1, provider)
const abi = [
    "",
    "",
    ""
]

const contract = new ethers.Contract(contractAddr, abi, provider)


