require("@nomicfoundation/hardhat-toolbox");
const tenderly = require("@tenderly/hardhat-tenderly");
 
tenderly.setup({ automaticVerifications: true });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    virtualMainnet: {
      url: "https://virtual.mainnet.rpc.tenderly.co/7cf36273-4f0d-4712-a3ed-7a2601108ebb",
      chainId: 175361
    },
  },
  tenderly: {
    // https://docs.tenderly.co/account/projects/account-project-slug
    project: "project",
    username: "JanessaTech",
  }
};
