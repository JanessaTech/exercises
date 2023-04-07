### Create two test accounts

`datadir`  is any location we choose for the testnet to put its data in. Remember the password you enter, 'password' is easy enough. Do this command twice to make two accounts.

`geth account new --datadir=E:\\code\\geth\\testnet\\datadi`

Please make notes for the password of each new account, we will use them later on

### Create a custom genesis block

A generic template was taken from:  [https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)

Make sure to fill in the  `ACCOUNT_ID1`  and `ACCOUNT_ID2`with the real account address you created above. I named the file  `HelloWorldGenesis.json`

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
        "ACCOUNT_ID1": { "balance": "30000" },
        "ACCOUNT_ID2": { "balance": "40000" }
    }
}

```
###Setup our testnet with the custom genesis block

`geth --identity "HelloWorldNode" --datadir E:\\code\\geth\\testnet\\datadi --metrics —-networkid 2999 init HelloWorldGenesis.json`

### Interact with the testnet
Make sure to fill in the  `ACCOUNT_ID1`  and `ACCOUNT_ID2`with the real account address you created above

`geth --identity "HelloWorldNode" --http --http.port "8545" --http.api "web3,net,eth,admin,personal" --http.corsdomain "*" --datadir E:\\code\\geth\\testnet\\datadi --metrics --rpc.enabledeprecatedpersonal --allow-insecure-unlock --nodiscover --unlock 'ACCOUNT_ID1,ACCOUNT_ID2' console`

### Check exsiting accounts
You need input password for each account to to be unlocked.
Once all account are unlocked, try the below command to get list of accounts:
`eth.accounts`

###  Interact in a different console
Open a new terminal, input command: `geth attach http://127.0.0.1:8545`

Try commands to check accounts:
    
	eth.accounts
    eth.getBalance(eth.accounts[0])
    eth.getBalance(eth.accounts[1])