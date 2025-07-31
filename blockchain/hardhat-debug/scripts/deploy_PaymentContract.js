const { ethers } = require("hardhat") 

async function main() {
    const [acount1, ...others] = await ethers.getSigners()
    const PaymentContract = await ethers.deployContract("PaymentContract", []);
    await PaymentContract.waitForDeployment();

  console.log('PaymentContract is deployed at:', await PaymentContract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  //npx hardhat run scripts/deploy_PaymentContract.js --network localhost