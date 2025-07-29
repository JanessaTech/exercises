const { ethers } = require("hardhat") 

async function main() {
    const [acount1, ...others] = await ethers.getSigners()
    const Hello = await ethers.deployContract("Hello", ['JanessaTech']);
    await Hello.waitForDeployment();

  console.log('Hello is deployed at:', await Hello.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  //npx hardhat run scripts/deploy.js --network localhost