import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import * as dotenv from "dotenv";
// dotenv.config();
// const { TENDERLY_AUTOMATIC_VERIFICATION } = process.env;
// console.log('TENDERLY_PRIVATE_VERIFICATION =', TENDERLY_AUTOMATIC_VERIFICATION )
 
// import * as tenderly from "@tenderly/hardhat-tenderly";
// tenderly.setup({ automaticVerifications: true });



const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks:{
    virtualMainnet: {
      url: "https://virtual.mainnet.eu.rpc.tenderly.co/97689d80-5a41-4417-9c6c-f3c760e191d6",
      chainId: 175362 // the Chain ID you selected during creation
    }
  },
  // tenderly: {
  //   project: "project",
  //   username: "JanessaTech",
  //   privateVerification: false
  // },
};

export default config;
