const { ethers } = require("ethers");

const  provider = new ethers.providers.JsonRpcProvider();
// Make sure the following accounts exist in Hardhat when it is started. If not, update them accordingly
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // the first account given by local hardhat
const account2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' // the second account given by local hardhat
const contractAddr = '0x5fbdb2315678afecb367f032d93f642f64180aa3' // assume you have deployed the following contract at this address （local）
/***
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloWorld {
    string public name = "default";

    constructor() payable {}

    function setName(string memory _name) public {
        name = _name;
    }
    function getName() public view returns(string memory) {
        return name;
    }
}
 */
const privateKey1 = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const privateKey2 = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'

const signer = new ethers.Wallet(privateKey1, provider)

const ReadBlance = async () => {
    const balance = await provider.getBalance(addr)
    console.log(ethers.utils.formatEther(balance))
}

const QueryBlock = async () => {
    const index = await provider.getBlockNumber()
    console.log("latest block number is:", index)
}

const TransferEther = async () => {
    const account1BalanceBefore = await provider.getBalance(account1)
    const account2BalanceBefore = await provider.getBalance(account2)
    console.log("account1BalanceBefore = ", ethers.utils.formatEther(account1BalanceBefore))
    console.log("account2BalanceBefore = ", ethers.utils.formatEther(account2BalanceBefore))
    const tx = await signer.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("1.0")
    })
    await tx.wait()
    console.log(tx)

    const account1BalanceAfter = await provider.getBalance(account1)
    const account2Balanceafter = await provider.getBalance(account2)
    console.log("account1BalanceAfter = ", ethers.utils.formatEther(account1BalanceAfter))
    console.log("account2Balanceafter = ", ethers.utils.formatEther(account2Balanceafter))

}

ReadSmartContract = async () => {
    const abi = [
        'function getName() public view returns(string)',
        'function setName(string _name) public']
    const helloword = new ethers.Contract(contractAddr, abi, provider)

    const name = await helloword.getName()
    console.log('The name in contract is:', name)

}

WriteSmartContract = async () => {
    const abi = [
        'function getName() public view returns(string)',
        'function setName(string _name) public']
    const helloword = new ethers.Contract(contractAddr, abi, provider)

    const hellowordWithSigner = helloword.connect(signer)
    const tx = await hellowordWithSigner.setName("Janessa tech")
    await tx.wait()
    console.log(tx)

    const newName = await helloword.getName()
    console.log('The newName in contract is:', newName)

}


/**
 * This is a demo to show how to interact with the smart contracl deployed on the local hardhat enviroment
 * Make sure:
 * 1. local hardhat is started at 8545
 * 2. Use remix to deploy the contract to the local hardhat before we run the codes
 *  */ 

//ReadBlance()
//QueryBlock()
TransferEther()
//ReadSmartContract()
//WriteSmartContract()


