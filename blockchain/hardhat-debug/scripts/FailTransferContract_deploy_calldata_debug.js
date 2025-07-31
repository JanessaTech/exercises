const { ethers } = require("hardhat");

async function debugTransaction(txHash) {
  // 1. 获取交易详情
  const tx = await ethers.provider.getTransaction(txHash);
  console.log("交易详情:", {
    to: tx.to,
    data: tx.data,
    from: tx.from,
    value: tx.value.toString()
  });

  // 2. 获取交易回执
  const receipt = await ethers.provider.getTransactionReceipt(txHash);
  console.log("交易回执:", {
    status: receipt.status, // 0 表示失败
    gasUsed: receipt.gasUsed.toString(),
    logs: receipt.logs
  });

  // 3. 使用 debug_traceTransaction 获取详细调用栈
//   const trace = await ethers.provider.send("debug_traceTransaction", [
//     txHash,
//     {
//       enableMemory: true,
//       disableStack: false,
//       disableStorage: false,
//       //tracer: "callTracer" // 使用内置tracer获取调用关系
//     }
//   ]);

//   console.log("完整调用栈跟踪:");
//   console.log(JSON.stringify(trace, null, 2));
  
  // 4. 解析失败原因（关键步骤）
  if (receipt.status === 0) {
    const reason = await getRevertReason(txHash);
    console.log(`\n交易失败原因: ${reason}`);
  }


}

async function getRevertReason(txHash) {
    const tx = await ethers.provider.getTransaction(txHash);
    
    try {
      // 使用callStatic模拟交易
      await ethers.provider.call({
        to: tx.to,
        data: tx.data,
        from: tx.from
      }, tx.blockNumber);
    } catch (error) {
      // 从错误信息中提取原因
      const reason = error.error?.error?.data?.message || 
                    error.error?.data?.originalError?.message || 
                    error.reason;
      return reason || "未知错误";
    }
    return "交易成功(但区块状态显示失败，可能gas不足)";
  }
  
  // 从命令行参数获取交易哈希
  const txHash = '0xc4b911d3ea27b6f3e4bd4dd3e4c508de86050b1fb899871a5b3898c6d0184e61'
  if (!txHash) {
    console.error("请提供交易哈希作为参数");
    process.exit(1);
  }
  
  debugTransaction(txHash);


// 1. npx hardhat node  // start local env first
// 2. npx hardhat run scripts/FailTransferContract_deploy_calldata_debug.js --network localhost
