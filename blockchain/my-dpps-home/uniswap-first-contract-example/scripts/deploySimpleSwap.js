const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; 
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const ercAbi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function deposit() public payable",
    "function approve(address spender, uint256 amount) returns (bool)",
  ];
  const SimpleSwap = await hre.ethers.getContractFactory("SimpleSwap");
  const simpleSwap = await SimpleSwap.deploy(SwapRouterAddress);
  
  await simpleSwap.deployed();

  console.log("Simple Swap contract deployed: ", simpleSwap.address);
  // let signers = await hre.ethers.getSigners();

  // const WETH = new hre.ethers.Contract(WETH_ADDRESS, ercAbi, signers[0]);  // use the first account as msg.sender
  // const deposit = await WETH.deposit({ value: hre.ethers.utils.parseEther("10") });
  // await deposit.wait();
  // console.log("Deposit 10 eth to WETH in advance")
  // await WETH.approve(simpleSwap.address, hre.ethers.utils.parseEther("1")); 
  // console.log('approve ', simpleSwap.address, '1 eth for WETH')
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});