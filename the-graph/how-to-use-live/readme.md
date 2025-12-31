## dependences
```
npm install express
npm install typescript @types/node @types/express --save-dev
npm install ts-node --save-dev

npm install graphql-ws
npm install ws
npm install --save-dev @types/ws


npm install --save-dev @graphprotocol/client-cli
npm install graphql-request

```

## How to start
```
npm start
npm run codegen
npm run dev
```

## full .graphclientrc.yml
```
fragment PoolLiveDataFields on Pool {
  liquidity
  tick
  sqrtPrice
  feeTier
  id
}

query GetMultipleArbitrumPoolLiveData($poolIds: [ID!]!) @live(interval: 5000) {
  uniswapv3_arbitrum: pools(where: { id_in: $poolIds }) {
    ...PoolLiveDataFields
  }
}

query GetMultipleEthereumPoolLiveData($poolIds: [ID!]!) @live(interval: 5000) {
  uniswapv3_ethereum: pools(where: { id_in: $poolIds }) {
    ...PoolLiveDataFields
  }
}
```

## full .graphclientrc.yml
```
sources:
  - name: uniswapv3_ethereum
    handler:
      graphql:
        endpoint: https://gateway.thegraph.com/api/eada99c8eee80663db1e909b89c14a3f/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV
  - name: uniswapv3_arbitrum
    handler:
      graphql:
        endpoint: https://gateway-arbitrum.network.thegraph.com/api/eada99c8eee80663db1e909b89c14a3f/subgraphs/id/HyW7A86UEdYVt5b9Lrw8W2F98yKecerHKutZTRbSCX27
plugins:
  - pollingLive:
      defaultInterval: 10000
documents:
  - operations.gql
```
