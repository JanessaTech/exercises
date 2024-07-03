# Basic Uniswap Integration Environment

Learn to build your first on chain integration here: https://uniswap.org/blog/your-first-uniswap-integration.

## Install dependences

```
    npm add @uniswap/swap-router-contracts
    npm add @uniswap/v3-periphery @uniswap/v3-core
```

## How to deploy

```
 For SingleSwap.sol, run:
    npx hardhat run --network sepolia scripts/deploySingleSwap.js
 For SimpleSwap.sol, run(You should start a forking on mainnet on local first):
    npx hardhat run --network localhost scripts/deploySimpleSwap.js

```

## How to run test cases for SingleSwap.sol

```
    1. start a forking on mainnet on local:
        npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/lFKEWE2Z7nkAXL73NSeAM2d5EbndwoQk
    2. run test cases
        npx hardhat test --network localhost

```
