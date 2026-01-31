import { ethers, Log } from "ethers";
import { ERC20_ABI } from "./abi";
import TransferLog from "./TransferLogModel";
import mongoose from "mongoose";

type TransferLogType = {
    eventName: string;
    from: string;
    to:string;
    value: string; //wei
    tokenAddress: string;
    blockNumber: number;
    txHash: string;
    logIndex: number;
}

class TransferLogParser {
    private provider: ethers.JsonRpcProvider
    private iface = new ethers.Interface(ERC20_ABI)
    constructor(rpcUrl: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl)
    }

    async processBlock(blockNumber: number) {
        try {
            const [block, logs] = await Promise.all([
                this.provider.getBlock(blockNumber),
                this.provider.getLogs({
                    fromBlock: blockNumber, toBlock: blockNumber,
                    topics: [ethers.id('Transfer(address,address,uint256)')]
                })
            ])
            if (!block) return new Error(`block ${blockNumber} not found`)
            console.log(`${logs.length} logs in block ${blockNumber}`)
            const transferPromises = logs.map(async (log) => {
                try {
                    this.validate(log)
                    const parsedLog = await this.parseTransferLog(log)
                    if(parsedLog) {
                        await this.saveTransferData(parsedLog)
                        return true
                    }
                } catch(err) {
                    console.log('failed to parse log:', err)
                    console.log('log:', log)
                    return false
                }
                return false
            })

            const results = await Promise.allSettled(transferPromises)
            const processdCount = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
            console.log(`Saved ${processdCount} records for block ${blockNumber}`)
        } catch(error) {
            console.log(`Failed to process block ${blockNumber}`, error)
            throw error
        }
    }

    private validate(log: Log) {
        if (log.topics.length !== 3) {
            throw new Error('topics length is not 3')
        } 
        if (!log.data || log.data === '0x') {
            throw new Error('topics data is empty')
        }
        if (log.data.length < 2 + 64) {  // '0x' + 64
            throw new Error('topics data is not 32 bytes')
        }
    }

    private async parseTransferLog(log: Log) {
        const parsedLog = this.iface.parseLog({topics: log.topics, data: log.data})
        if (!parsedLog || parsedLog.name !== 'Transfer') return null
        const [from, to, value] = parsedLog.args
        const tokenAddress = log.address
        return {
            eventName: 'Transfer',
            from: from.toLowerCase(),
            to: to.toLowerCase(),
            value: value.toString(),
            tokenAddress: tokenAddress,
            blockNumber: log.blockNumber,
            txHash: log.transactionHash,
            logIndex:log.index
        } as TransferLogType
    }

    private async saveTransferData(data: TransferLogType) {
        try {
            await TransferLog.findOneAndUpdate(
                {txHash: data.txHash, logIndex: data.logIndex},
                data,
                {upsert: true, new: true, setDefaultsOnInsert: true}
            )
        } catch(error) {
            console.log('failed to inster log data:', error)
        }
    }
}

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/shousi')
    const parser = new TransferLogParser('https://eth-mainnet.public.blastap')
    await parser.processBlock(24052856)
}

main().catch((err) => console.log(err))