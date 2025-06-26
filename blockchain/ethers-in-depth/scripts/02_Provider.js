const {ethers} = require('ethers')

function getProvider() {
    // 利用公共rpc节点连接以太坊网络
    // 可以在 https://chainlist.org 上找到
    //const SEPOLIA_URL = 'https://rpc.sepolia.org';
    //const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_URL)
    //const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/QLyqy7ll-NxAiFILvr2Am");
    //const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/c385e2e722284dc9b570de7ede60dba1"); failed to connect
    
    return provider
}

async function getBlock() {
    const provider = getProvider()
    const block = await provider.getBlock() // by default, we get the latest block
    console.log(block)
}

async function getNetwork() {
    const provider = getProvider()
    const network = await provider.getNetwork()
    console.log("network name:", network.name)
    console.log("network chainId:", network.chainId)
    
}

async function getBlockNumber() {
    const provider = getProvider()
    const blockNumber = await provider.getBlockNumber()
    console.log(blockNumber)
}

async function getTransactionsInOneBlock() {
    const provider = getProvider()
    const block = await provider.getBlock() //get the latest block
    const txs = block.transactions
    for(var i = 0; i< txs.length; i++) {
        console.log(`transaction hash in block ${block.number}: ${txs[i]}`)
    }
}

async function getTransactionByHash() {
    const provider = getProvider()
    const block = await provider.getBlock()
    const hash = block.transactions && block.transactions.length > 0 ? block.transactions[0] : ''
    if (hash) {
        console.log('transaction hash:', hash)
        const tx = await provider.getTransaction(hash)
        console.log(tx)
    }else {
        console.log('no transaction is found in the latest block')
    }
}
async function getCode() {
    const contractAdd = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' // assume you have a contract deployed at here
    const provider = getProvider()
    const code = await provider.getCode(contractAdd)
    console.log(code)
}

//getBlock()
//getNetwork()
getBlockNumber()
//getTransactionsInOneBlock()
//getTransactionByHash()
//getCode()