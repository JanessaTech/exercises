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
async function filters() {
    const provider = getProvider()
    const from  = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const contractAdd = '0x5FbDB2315678afecb367f032d93F642f64180aa3'  // assume this is the address you got from 03_deployContract.js
    const abi = [
        'function setMsg(string _mesg) public',
        'function getMsg() public view returns(string)',
        'event logger(address indexed from, string mesg)'
    ]
    const contractInstance = new ethers.Contract(contractAdd, abi, provider)

    const filter = contractInstance.filters.logger(from)
    console.log(filter)
    contractInstance.on(filter, (res) => {
        console.log(res.args)
        console.log(res.log)
    })

}
filters()

// for more, see : https://docs.ethers.org/v5/concepts/events/