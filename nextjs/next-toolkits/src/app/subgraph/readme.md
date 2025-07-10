## Before running

1. You need to register https://thegraph.com/ and create an API key

## Installed dependences

```
npm install urql
```

## How to run

```
1. npm run dev
2. In browser, http://localhost:3001/subgraph, you will the content as below:
{
  "token": {
    "__typename": "Token",
    "derivedETH": "1",
    "name": "Wrapped Ether",
    "symbol": "WETH"
  }
}
```
