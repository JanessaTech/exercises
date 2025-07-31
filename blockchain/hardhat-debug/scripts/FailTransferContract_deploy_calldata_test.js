const { ethers } = require("hardhat");

async function main() {
    const [sender, receiver, ...others] = await ethers.getSigners()
    const FailTransferContract = await ethers.getContractFactory('FailTransferContract')
    const contract = await FailTransferContract.deploy();
    await contract.waitForDeployment()

    const calldata = contract.interface.encodeFunctionData('transfer', [
        receiver.address,
        ethers.parseEther("1.0")
    ])

    console.log('calldata=', calldata)

    /*
    the second way to get calldata
    const abi = ['function transfer(address, uint) external']
    const iface = new ethers.Interface(abi)
    const cdata = iface.encodeFunctionData('transfer(address, uint)', [await receiver.getAddress(), ethers.parseEther("1.0")])
    console.log('cdata=', cdata)
    **/

    const tx = await sender.sendTransaction({
        to: await contract.getAddress(),
        data: calldata,
        gasLimit: 1000000
    })

    try {
        await tx.wait()
    } catch(err) {
        console.error("tx failed:", err);
        return tx.hash; // return tx hash
    }
}

main().then(console.log).catch(console.error);


// 1. npx hardhat node  // start local env first
// 2. npx hardhat run scripts/FailTransferContract_deploy_calldata_test.js --network localhost
