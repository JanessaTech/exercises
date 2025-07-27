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

function getProvider() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    return provider
}

function getSignerA(provider) {
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const signer = new ethers.Wallet(privateKey, provider)
    return signer
}

function getSignerB(provider) {
    const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
    const signer = new ethers.Wallet(privateKey, provider)
    return signer
}
async function getContract() {
    const provider = getProvider()
    const signerA = getSignerA(provider)
    const contract = new ethers.Contract(contractAddress, erc20ABI, signerA)
    return contract
}

async function mint() {
    const provider = getProvider()
    const signerA = getSignerA(provider)
    const signerB = getSignerB(provider)
    const addressA = await signerA.getAddress()
    const addressB = await signerB.getAddress()
    console.log('signerA address =', addressA)
    console.log('signerB address =', addressB)
    const contract = await getContract()
    const tx = await contract.mint(addressA, 1000)
    const receipt = await tx.wait()
    console.log('minted for ', addressA)
    console.log('hash for approve:', tx.hash)
    console.log(receipt)
}

async function approve() {
    const provider = getProvider()
    const signerB = getSignerB(provider)
    const signerA = getSignerA(provider)
    const addressA = await signerA.getAddress()
    const addressB = await signerB.getAddress()
    const contract = await getContract()
    const tx = await contract.approve(addressB, 500)
    const receipt = await tx.wait()
    console.log('approved for ', addressB)
    console.log('hash for approve:', tx.hash)
    console.log(receipt)
    const allowance = await contract.allowance(addressA, addressB)
    console.log('allowance =', allowance)
}

async function transferFrom() {
    const provider = getProvider()
    const signerB = getSignerB(provider)
    const signerA = getSignerA(provider)
    const addressA = await signerA.getAddress()
    const addressB = await signerB.getAddress()
    const contract = await getContract()
    const newContract = contract.connect(signerB)
    const tx = await newContract.transferFrom(addressA, addressB, 300)
    const receipt = await tx.wait()
    console.log('hash for transferFrom:', tx.hash)
    console.log(receipt)
    const balanceA = await contract.balanceOf(addressA)
    const balanceB = await contract.balanceOf(addressB)
    console.log('balanceA =', balanceA)
    console.log('balanceB =', balanceB)
}

async function main() {
    try {
        await mint()
        await getContract()
        await approve()
        await transferFrom()
    } catch(err) {
        console.log('error in main:', err)
    }
}

main().then(
).catch((err) => {
    console.log('err', err)
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