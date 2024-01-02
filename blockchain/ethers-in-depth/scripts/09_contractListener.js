const {ethers} = require('ethers')

function getProvider() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    return provider
}

// we assume you have run 03_deployContract.js one time
async function listen() {
    const provider = getProvider()
    const contractAdd = '0x5FbDB2315678afecb367f032d93F642f64180aa3'  // assume this is the address you got from 03_deployContract.js
    const abi = [
        'function setMsg(string _mesg) public',
        'function getMsg() public view returns(string)',
        'event logger(address indexed from, string indexed method, string mesg)',
        'function deposit() public payable'
    ]
    const contractInstance = new ethers.Contract(contractAdd, abi, provider)
    console.log('Start to listen to HelloWorld.sol by calling .on() ...')
    contractInstance.on('logger', (from, method, mesg, event) => {
        console.log(`from=${from} method=${method} mesg=${mesg} event=${event}`)
    })

}
listen()
// once you start 09_contractListener.js, you could setMsg by calling 05_writeContract.js or calling setMsg in remix

