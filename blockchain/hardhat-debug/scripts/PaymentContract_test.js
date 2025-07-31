const { ethers } = require("hardhat");
async function main() {
  // The address of PaymentContract.sol
  const contractAddress = "0x14835B093D320AA5c9806BBC64C17F0F2546D9EE";
  
  // 获取一个签名者（账户）
  const [signer] = await ethers.getSigners();
  
  // 创建合约实例（这里使用ABI，但如果你没有ABI，也可以使用encodeFunctionData手动构造calldata）
  // 注意：为了调试方便，最好有合约ABI
  const Payment = await ethers.getContractFactory("PaymentContract");
  const payment = Payment.attach(contractAddress);
  
  try {
    // 模拟发送交易（这里调用withdraw函数）
    const tx = await payment.connect(signer).withdraw();
    await tx.wait();
    console.log("Withdrawal successful!");
  } catch (error) {
    // 这里会打印出详细的错误信息，包括调用栈和revert原因
    console.error("Transaction failed:", error);
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  // npx hardhat node  // start local env first
  // npx hardhat run scripts/deploy_PaymentContract.js --network localhost   // deploy PaymentContract.sol to local env
  //npx hardhat run scripts/PaymentContract_test.js --network localhost  // interactive test
