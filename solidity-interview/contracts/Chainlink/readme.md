## How to read datafeed from chainlink

1. npm install @chainlink/contracts
2. create DataConsumerV3.sol (assmue you are going to get price of BTC/USD from Sepolia)
3. Add Link token in sepolia: https://faucets.chain.link/sepolia
4. execute remixd.cmd in VScode terminal
5. open Remix, connect to local file system
6. Compile and deploy DataConsumerV3.sol in remix under Injected provider-Metamask(ensure you have MetaMask installed)

Note: choose a valid rpc for Sepolia in https://chainlist.org/chain/11155111, if Sepolia in your wallet cannot work

Tp get started with reading datafeed from chainlink, see : https://docs.chain.link/data-feeds
