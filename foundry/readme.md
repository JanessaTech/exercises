## About this directory

This is the place I do foundry-related experiments

## Commonly used commands
```
run test:
forge test
run test against chain state by forking
forge test --fork-url https://eth-mainnet.g.alchemy.com/v2/QLyqy7ll-NxAiFILvr2Am

deploy:
export PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
forge script script/Hello.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key $PRIVATE_KEY

start local node:
anvil
forking mainnet:
anvil --fork-url https://eth-mainnet.g.alchemy.com/v2/QLyqy7ll-NxAiFILvr2Am  --chain-id 31337


maxFee ≥ baseFee（基础费，被销毁） + priorityFee（小费，给矿工）
cast base-fee --rpc-url https://eth-mainnet.g.alchemy.com/v2/QLyqy7ll-NxAiFILvr2Am latest   # 获取最新基准费
cast gas-price --rpc-url https://eth-mainnet.g.alchemy.com/v2/QLyqy7ll-NxAiFILvr2Am    # 获取建议小费
eg: Base Fee 为 ‌18 Gwei‌
Max Priority Fee = 2 Gwei
Max Fee = (18 + 2) * 1.2 = 24 Gwei  // 增加 20% 缓冲



cast run <TX_HASH> --rpc-url http://localhost:8545 (跟踪堆栈，巨好用)
（to show name of contract, we use etherscan-api-key, check https://etherscan.io/myapikey to get your key）
cast run <TX_HASH> --etherscan-api-key <YOUR_KEY> --rpc-url http://localhost:8545  
```