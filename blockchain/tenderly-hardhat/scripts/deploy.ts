import {ethers} from "hardhat";

async function main() {
    const [acount1, ...others] = await ethers.getSigners()
    const PersonArrayDemo = await ethers.deployContract("PersonArrayDemo", []);
    await PersonArrayDemo.waitForDeployment()

  console.log('PersonArrayDemo is deployed at:', await PersonArrayDemo.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  //npx hardhat run scripts/deploy.ts --network virtualMainnet