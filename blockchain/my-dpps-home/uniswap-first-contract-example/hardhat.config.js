require("@nomiclabs/hardhat-waffle");
// require('hardhat-ethernal');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers:[ {
      version: "0.8.0",
    },
    {
      version: "0.7.6"
    }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/cf17b96a1c8d4fdd8b3c2e1337f2134a`,
      accounts: ['0xe21a8a3f8c5b7169ea3fe3c732a3eef519d43e4a6e55095a1d1bb0ef99896623'],
    }
  }
};
