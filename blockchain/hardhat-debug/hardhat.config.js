require("@nomicfoundation/hardhat-toolbox");
require("hardhat-tracer");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/QLyqy7ll-NxAiFILvr2Am",
        blockNumber:23049903
      },
      gasPrice:30000000000
    },
    virtualMainnet: {
      url: "https://virtual.mainnet.eu.rpc.tenderly.co/97689d80-5a41-4417-9c6c-f3c760e191d6",
      chainId: 175362 // the Chain ID you selected during creation
    }
  }
};
