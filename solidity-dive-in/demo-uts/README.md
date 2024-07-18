# How to run forking mainne on local and do test

```
    npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/lFKEWE2Z7nkAXL73NSeAM2d5EbndwoQk
    npx hardhat test --network localhost .\test\xxx.test.js
```

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
