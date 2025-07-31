const { ethers } = require("hardhat");
async function main() {
  // The address of PaymentContract.sol
  const contractAddress = "0x14835B093D320AA5c9806BBC64C17F0F2546D9EE";
  
  // 获取一个签名者（账户）
  const [signer] = await ethers.getSigners();
  
   // 手动构造calldata（这里以withdraw函数为例）
   // 使用ethers.utils.keccak256(ethers.utils.toUtf8Bytes("withdraw()"))的前4个字节
   //ethers.keccak256(ethers.toUtf8Bytes("withdraw()"))
   const data = "0x3ccfd60b";  // withdraw()的函数选择器

   try {
    // send transaction
    const tx = await signer.sendTransaction({
      to: contractAddress,
      data: data,
    });
    await tx.wait();
  } catch (error) {
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
  //npx hardhat run scripts/PaymentContract_calldata_test.js --network localhost  // interactive test
