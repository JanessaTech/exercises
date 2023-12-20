# dependences

```
npm install nft.storage
npm install mime
npm install -g ipfs-caripfs
```

# How to upload files to nft.storage:

```
node scripts/upload.mjs files/me.jpg 'me pic' 'This is first case to upload img'

output:
Token {
  ipnft: 'bafyreieq4zwbsql4hcevtg7nwwdzesxccjepzatyq33rrllk2cecw4b54e',
  url: 'ipfs://bafyreieq4zwbsql4hcevtg7nwwdzesxccjepzatyq33rrllk2cecw4b54e/metadata.json'
}



node scripts/upload.mjs files/myjson.json 'myjson.json' 'this is a json file'

output:
Token {
  ipnft: 'bafyreicw3taazenwcsi745faadv3jcgrpxspc4bjy7lgctws5kdn5ikfi4',
  url: 'ipfs://bafyreicw3taazenwcsi745faadv3jcgrpxspc4bjy7lgctws5kdn5ikfi4/metadata.json'
}
```

# How to create/extract CAR file

```
npm install -g ipfs-car

ipfs-car pack .\files\cartest --output .\files\\a.car
ipfs-car ls .\files\\a.car
ipfs-car unpack .\files\\a.car --output .\files\to
```
