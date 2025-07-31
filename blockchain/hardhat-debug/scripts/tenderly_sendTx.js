const { ethers } = require("hardhat") 
const hre = require("hardhat") 

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WETH_WHALE='0x3ee18B2214AFF97000D974cf647E7C347E8fa585';
const WETH_DECIMALS = 18; 
const erc20Abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)",
    "function approve(address,uint256) returns (bool)",
    "function transfer(address, uint256) returns (bool)",
    "function transferFrom(address,address,uint256) returns (bool)",
    "function allowance(address,address) view returns (uint256)"
  ];

async function main() {
    const [account1, account2, ...others] = await ethers.getSigners()
    console.log(await account1.getAddress())

    const WETH = new ethers.Contract(WETH_ADDRESS, erc20Abi, ethers.provider)
        await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [WETH_WHALE],
        });
    const wethWhale = await ethers.getSigner(WETH_WHALE)
    await WETH.connect(wethWhale).transfer(account2.address, ethers.parseUnits('10', WETH_DECIMALS))
    const balance = await WETH.balanceOf(account2.address)
    console.log('balance =', balance)
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
/**
 * 
 */
//npx hardhat run scripts/tenderly_sendTx.js --network virtualMainnet