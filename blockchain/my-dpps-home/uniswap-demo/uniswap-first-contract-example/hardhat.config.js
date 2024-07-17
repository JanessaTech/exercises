require("@nomiclabs/hardhat-waffle");
// const tenderly = require("@tenderly/hardhat-tenderly");
 
// tenderly.setup({ automaticVerifications: true });
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
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  // networks: {
  //   virtualMainnet: {
  //     url: "https://virtual.mainnet.rpc.tenderly.co/7cf36273-4f0d-4712-a3ed-7a2601108ebb",
  //     chainId: 175361
  //   },
  // },
  // tenderly: {
  //   // https://docs.tenderly.co/account/projects/account-project-slug
  //   project: "project",
  //   username: "JanessaTech",
  // }
};
