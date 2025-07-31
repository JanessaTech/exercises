
const { ethers } = require("hardhat");
async function debugTransaction(txHash) {
  // 使用provider发送debug_traceTransaction
  const trace = await ethers.provider.send("debug_traceTransaction", [txHash, {}]);
  console.log(JSON.stringify(trace, null, 2));
}

const txHash = '0xb83cb4a91d0ee38b53c0823a19920de03435a6893b20206bc5e7a0e3e32ca417'
debugTransaction(txHash).catch((e) => {
  console.error(e)
})
  // 1. npx hardhat node  // start local env first
  // 2. npx hardhat run scripts/deploy_PaymentContract.js --network localhost   // deploy PaymentContract.sol to local env
  // 3. run one of the two below:
  //   a. npx hardhat run scripts/PaymentContract_calldata_test.js --network localhost
  //   b. npx hardhat run scripts/PaymentContract_test.js --network localhost

  // 4. pick the tx id, set it to txHash

  //5. npx hardhat run scripts/PaymentContract_traceTransaction_test.js --network localhost  // interactive test
  // For #5, the output is the EVM ops codes which are hard to read
