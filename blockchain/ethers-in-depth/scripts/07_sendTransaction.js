const {ethers} = require('ethers')

function createWallet() {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const wallet = new ethers.Wallet(privateKey, provider)
    console.log('address:', wallet.address, ' private key:', wallet.privateKey);
    return wallet
}

async function send() {
    const wallet = createWallet()
    const to  = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    const from = wallet.address
    const tx = {
        to: to,
        value: ethers.parseEther('10')
    }
    const balanceBeforeTo = await wallet.provider.getBalance(to)
    const balanceBeforeFrom = await wallet.provider.getBalance(from)
    console.log('balanceBefore at ', to , ': ', ethers.formatEther(balanceBeforeTo) , ' ETH')
    console.log('balanceBefore at ', from , ': ', ethers.formatEther(balanceBeforeFrom) , ' ETH')
    const receipt = await wallet.sendTransaction(tx)
    await receipt.wait()
    console.log(receipt)
    const balanceAfterTo = await wallet.provider.getBalance(to)
    const balanceAfterFrom = await wallet.provider.getBalance(from)
    console.log('balanceAfter at ', to , ': ', ethers.formatEther(balanceAfterTo) , ' ETH')
    console.log('balanceAfter at ', from , ': ', ethers.formatEther(balanceAfterFrom) , ' ETH')
}

send()