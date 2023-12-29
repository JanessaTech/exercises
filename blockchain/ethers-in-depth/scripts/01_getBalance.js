const {ethers} = require("ethers")


const getBalance_local = async () => {
    // you must install a local env saying hardhat
    const provider = new ethers.getDefaultProvider('http://127.0.0.1:8545/');
    const account = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const balance = await provider.getBalance(account);
    console.log(`ETH Balance of ${account} on hardhat: ${ethers.formatEther(balance)} ETH`);
}
const getBalance_infura = async () => {
    const INFURA_API_KEY = '0326c4f69a034543b424b27d34057159'
    const network = "sepolia"
    const account = '0xb129c8aD40e31bC421F37b5B418CF1Bfe1175536'
    const provider = new ethers.InfuraProvider(network,INFURA_API_KEY)
    const balance = await provider.getBalance(account);
    console.log(`ETH Balance of ${account} on Infura: ${ethers.formatEther(balance)} ETH`);
}

getBalance_local()
//getBalance_infura()
