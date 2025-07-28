import { ethers } from "hardhat";

async function main() {
    const [acount1, ...others] = await ethers.getSigners()
    const myerc20 = await ethers.deployContract("MyERC20", [acount1.getAddress()]);
    await myerc20.waitForDeployment();

  console.log('MyERC20 is de[loyed at:', await myerc20.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//npx hardhat run scripts/myerc20_deploy.ts --network virtualMainnet
