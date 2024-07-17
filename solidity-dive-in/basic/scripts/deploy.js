const hre = require("hardhat");

async function main() {
  console.log("deploying...");
 
  const OrderlyDebug = await hre.ethers.getContractFactory("OrderlyDebug");
  const orderlyDebug = await OrderlyDebug.deploy();
  await orderlyDebug.waitForDeployment();

  console.log("OrderlyDebug contract deployed: ", orderlyDebug.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});