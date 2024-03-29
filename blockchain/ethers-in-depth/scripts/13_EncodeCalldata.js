const {ethers} = require('ethers')

const contractAdd = '0x5FbDB2315678afecb367f032d93F642f64180aa3'  // assume this is the address you got from 03_deployContract.js
const abi = [
    'function setMsg(string _mesg) public',
    'function getMsg() public view returns(string)',
    'event logger(address indexed from, string indexed method, string mesg)'
]

function getWallet() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const wallet = new ethers.Wallet(privateKey, provider)
    return wallet
}
function getProvider() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    return provider
}

async function readContract() {
    const provider = getProvider()
    const contractInstance = new ethers.Contract(contractAdd, abi, provider) 
    const param = contractInstance.interface.encodeFunctionData('getMsg',[])
    console.log('param:', param)
    const tx = {
        to: contractAdd,
        data: param
    }
    const message = await provider.call(tx)  // I cannot get correct result, why?
    console.log('message:', message)
}

async function writeContract() {  // it works
    const wallet = getWallet()
    const contractInstance = new ethers.Contract(contractAdd, abi, wallet) 
    const param = contractInstance.interface.encodeFunctionData('setMsg', ['cccccccc'])
    const tx = {
        to: contractAdd,
        data: param
    }
    console.log('param:', param)
    const receipt = await wallet.sendTransaction(tx)
    await receipt.wait()
    console.log(receipt)
}

//readContract()
writeContract()
