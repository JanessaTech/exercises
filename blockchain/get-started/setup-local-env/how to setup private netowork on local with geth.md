### Create two test accounts

`datadir`  is any location we choose for the testnet to put its data in. Remember the password you enter, 'password' is easy enough. Do this command twice to make two accounts.

`geth account new --datadir=E:\\code\\geth\\testnet\\datadi`

Please make notes for the password of each new account, we will use them later on
In this demo, I created two accounts:
```
    password1: 1JYhuVMW6pW9dQJvugNY6d6YkHkqp3pY
    account1: 0x6C66B772EA9ac14F81934bF223bCaF37f69cB249
    password2: 1JYhuVMW6pW9dQJvugNY6d6YkHkqp3pY
    account2: 0xbEc45d56D7A7b4A6dB8759588905CCE7FdAd6011
```

### Create a custom genesis block
A generic template was taken from:  [https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)
 I named the file  `HelloWorldGenesis.json`
```
{
    "config": {
        "chainId": 12345,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "0x400",
    "gasLimit": "0x21000",
	"parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "alloc": {
        "6C66B772EA9ac14F81934bF223bCaF37f69cB249": { "balance": "30000" },
        "bEc45d56D7A7b4A6dB8759588905CCE7FdAd6011": { "balance": "40000" }
    }
}

```
###Setup our custom network named **HelloWorldNode** with the custom genesis block

`geth --identity "HelloWorldNode" --datadir E:\\code\\geth\\testnet\\datadi --metrics —-networkid 2999 init HelloWorldGenesis.json`

### Interact with HelloWorldNode
Make sure to fill in the  `account1`  and `account2`with the real account address you created above

`geth --identity "HelloWorldNode" --http --http.port "8545" --http.api "web3,net,eth,admin,personal" --http.corsdomain "*" --datadir E:\\code\\geth\\testnet\\datadi --metrics --rpc.enabledeprecatedpersonal --allow-insecure-unlock --nodiscover --unlock 'account1,account2' console`

###  Interact using Javascript

#### Check accounts
You need input password for each account to to be unlocked.
Once all account are unlocked, try the below command to get list of accounts:

 `eth.accounts`
 
#### Check account balance
Get balance for **account1**  in the form of Ether:
```
eth.getBalance(eth.accounts[0])
eth.getBalance(eth.accounts[1])
web3.fromWei(eth.getBalance('0x6C66B772EA9ac14F81934bF223bCaF37f69cB249'), 'ether');
```

#### Send transaction
Send 100 wei from **account1** to **account2**:
```
eth.sendTransaction({
  from: '0x6C66B772EA9ac14F81934bF223bCaF37f69cB249',
  to: '0xbEc45d56D7A7b4A6dB8759588905CCE7FdAd6011',
  value: web3.toWei(0.0000000000000001, 'ether') 
});
```
#### Check transaction
Check the details of the transaction:
`eth.getTransaction('0x70919c7d07c26ad8165a2bf643751784508f52b80fc4b0a9b35339d4257932f0')`
`0x70919c7d07c26ad8165a2bf643751784508f52b80fc4b0a9b35339d4257932f0` is the hash id of the transaction

We you see result like this:
```
{
  blockHash: null,
  blockNumber: null,
  chainId: "0x3039",
  from: "0x6c66b772ea9ac14f81934bf223bcaf37f69cb249",
  gas: 21000,
  gasPrice: 1000000000,
  hash: "0x70919c7d07c26ad8165a2bf643751784508f52b80fc4b0a9b35339d4257932f0",
  input: "0x",
  nonce: 0,
  r: "0xf7e15a2c7e7ee78b174f206db445d76d90e19ddf1c7f6f8301198d96192016df",
  s: "0x11e820124b50f91c039f007405350972e1dfe82e99b66ebd17a34360b6d1db0f",
  to: "0xbec45d56d7a7b4a6db8759588905cce7fdad6011",
  transactionIndex: null,
  type: "0x0",
  v: "0x6096",
  value: 100
}
```

### Using Curl

#### Check accounts
```
curl -X POST http://127.0.0.1:8545 \
    -H "Content-Type: application/json" \
   --data '{"jsonrpc":"2.0", "method":"eth_accounts","params":[], "id":1}'
```
#### Check account1's balance
```
curl -X POST http://127.0.0.1:8545 \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["0x6C66B772EA9ac14F81934bF223bCaF37f69cB249","latest"], "id":1}'
```
#### Send transaction
```
curl -X POST http://127.0.0.1:8545 \
    -H "Content-Type: application/json" \
   --data '{"jsonrpc":"2.0", "method":"eth_sendTransaction", "params":[{"from": "0x6C66B772EA9ac14F81934bF223bCaF37f69cB249","to": "0xbEc45d56D7A7b4A6dB8759588905CCE7FdAd6011","value": "0x10"}], "id":1}'
```

###  Interact in a different console using Javascript
Open a new terminal, input command: `geth attach http://127.0.0.1:8545`

Try commands to check accounts:
```
 eth.accounts
 eth.getBalance(eth.accounts[0])
 eth.getBalance(eth.accounts[1])
```





