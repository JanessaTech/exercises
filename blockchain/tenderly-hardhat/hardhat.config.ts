import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    virtualMainnet: {
      url: "https://virtual.mainnet.eu.rpc.tenderly.co/b55f57b0-f37a-4f90-9d0a-190b6d7ff50f",
      chainId: 175362
    },
  }
};

export default config;
