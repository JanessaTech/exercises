require("@nomicfoundation/hardhat-toolbox");
const tenderly = require("@tenderly/hardhat-tenderly");
 
tenderly.setup({ automaticVerifications: true });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    virtualMainnet: {
      url: "https://virtual.mainnet.rpc.tenderly.co/b2cf2953-9b03-472f-bc70-4985194a8759",
      chainId: 175361,
    },
  },
  tenderly: {
    // https://docs.tenderly.co/account/projects/account-project-slug
    project: "project",
    username: "JanessaTech",
  }
};
