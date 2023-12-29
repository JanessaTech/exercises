const {ethers} = require('ethers')

function createWallet1() {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const wallet = new ethers.Wallet(privateKey, provider)
    return wallet
}

function createWallet2() {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    const wallet = new ethers.Wallet.createRandom(provider)
    return wallet
}

function createWallet3() {
    const phrase = 'dish lyrics because despair reunion library primary twenty local twist reject two'
    const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
    for (let index = 0; index < 3; index++) {
        const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`);
        console.log('address:', wallet.address, ' private key:', wallet.privateKey);
    }
}
//createWallet3()


