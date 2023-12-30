const {ethers} = require('ethers')

function getProvider() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    return provider
}
// we assume you have run 03_deployContract.js and 05_writeContract.js
async function queryFilter() {
    const provider = getProvider()
    const contractAdd = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'  // assume this is the address you got from 03_deployContract.js
    const abi = [
        'function setMsg(string _mesg) public',
        'function getMsg() public view returns(string)',
        'event logger(address from, string mesg)'
    ]
    const contractInstance = new ethers.Contract(contractAdd, abi, provider) // readonly
    const curBlockNumber = await provider.getBlockNumber()
    const events = await contractInstance.queryFilter('logger', null, curBlockNumber)
    console.log(`${events.length} events have been generated. See more as following:`)
    for(let i = 0; i < events.length; i++) {
        console.log(events[i])
    }
}

queryFilter()