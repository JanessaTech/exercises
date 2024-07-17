const hre = require("hardhat");

async function main() {
  console.log("deploying...");
 
  const LiquidityExamples = await hre.ethers.getContractFactory("LiquidityExamples");
  const liquidityExamples = await LiquidityExamples.deploy();
  await liquidityExamples.deployed();

  console.log("LiquidityExamples contract deployed: ", await liquidityExamples.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});