import { defineChain } from "viem";

export const hardhat = /*#__PURE__*/ defineChain({
    id: 31_337,
    name: 'Localhost-harhat',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'HARDHATETH',
    },
    rpcUrls: {
      default: { http: ['http://127.0.0.1:8545'] },
    },
  })