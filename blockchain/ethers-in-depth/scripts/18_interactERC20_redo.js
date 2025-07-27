const {ethers} = require('ethers')

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const erc20ABI = [
    'constructor(address)',
    'error ERC20InsufficientAllowance(address,uint256,uint256)',
    'error ERC20InsufficientBalance(address,uint256,uint256)',
    'error ERC20InvalidApprover(address)',
    'error ERC20InvalidReceiver(address)',
    'error ERC20InvalidSender(address)',
    'error ERC20InvalidSpender(address)',
    'error OwnableInvalidOwner(address)',
    'error OwnableUnauthorizedAccount(address)',
    'event Approval(address indexed,address indexed,uint256)',
    'event OwnershipTransferred(address indexed,address indexed)',
    'event Transfer(address indexed,address indexed,uint256)',
    'function allowance(address,address) view returns (uint256)',
    'function approve(address,uint256) returns (bool)',
    'function balanceOf(address) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function mint(address,uint256)',
    'function name() view returns (string)',
    'function owner() view returns (address)',
    'function renounceOwnership()',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function transfer(address,uint256) returns (bool)',
    'function transferFrom(address,address,uint256) returns (bool)',
    'function transferOwnership(address)'
  ]

async function main() {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    const privateKeyA = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const privateKeyB = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
    const signerA = new ethers.Wallet(privateKeyA, provider)
    const signerB = new ethers.Wallet(privateKeyB, provider)
    const addressA = await signerA.getAddress()
    const addressB = await signerB.getAddress()
    const contract = new ethers.Contract(contractAddress, erc20ABI, signerA)

    await contract.mint(addressA, 1000)
    await contract.approve(addressB, 500)
    const newContract= contract.connect(signerB)
    await newContract.transferFrom(addressA, addressB, 300)
    const balanceA = await contract.balanceOf(addressA)
    const balanceB = await contract.balanceOf(addressB)
    console.log('balanceA =', balanceA)
    console.log('balanceB =', balanceB)

}

main().then().catch((err) => {
    console.log(err)
})

/**
 * This example shows how to do mint, approve and transferFrom for ERC20, 
 * Before run this script, make sure:
 *  - hardhat is on
 *  - You've deployed contracts/MyERC20.sol 
 *    at 0x5FbDB2315678afecb367f032d93F642f64180aa3 
 *    using 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 as the owner on hardhat
 *  
 */