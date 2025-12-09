## dependences
```
npm install ethers
```

## How to create from scratch
1. Add dependences
```
npm init -y
npm install express
npm install typescript @types/node @types/express --save-dev
npm install ts-node --save-dev
npm install ethers
```
2. config script in package.json
```
"scripts": {
    "start": "ts-node src/app.ts",
    "build": "tsc",
    "server": "node dist/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## How to run
```
npm start
```
