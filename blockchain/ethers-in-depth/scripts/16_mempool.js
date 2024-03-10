const {ethers} = require('ethers')

const contractAdd = '0x5FbDB2315678afecb367f032d93F642f64180aa3'  // assume this is the address you got from 03_deployContract.js
const abi = [
    'function setMsg(string _mesg) public',
    'function getMsg() public view returns(string)',
    'event logger(address indexed from, string indexed method, string mesg)'
]

function getProvider() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    return provider
}

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

function getSignature() {
    const iface = new ethers.Interface(abi)
    return iface.getFunction('setMsg').selector
}

async function monitor() {
    const provider = getProvider()
    const wallet = getWallet()
    const signature = getSignature()
    const contractInstance = new ethers.Contract(contractAdd, abi, provider)
    console.log('signature:', signature)
    provider.on('pending', async (txhash) => {
        const tx = await provider.getTransaction(txhash)
        if (tx.data.indexOf(signature) !== -1) {
            console.log('A transaction is pending, details:\n')
            const from = tx.from
            console.log('from:', from)
            console.log(tx)
            // we could add code to run front-running codes. See more : https://github.com/WTFAcademy/WTF-Ethers/tree/main/23_Frontrun
        }
    })
}
monitor()