import { ethers, Log } from "ethers";
import mongoose from "mongoose";
import { ERC20_ABI } from "./abi";
import TransferLog from "./TransferModel";

type TransferLogType = {
    eventName: string;
    from: string;
    to: string;
    value: string;
    blockNumber: number;
    txHash: string;
    logIndex: number
}

class TransferLogParser {
    private provider: ethers.JsonRpcProvider
    private iface = new ethers.Interface(ERC20_ABI)

    constructor(rpc: string) {
        this.provider = new ethers.JsonRpcProvider(rpc)
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
            if (!block) throw new Error('block not found')
            console.log(`${logs.length} logs in block ${blockNumber}`)
            const allPromise = logs.map(async (log) => {
                try {
                    this.validate(log)
                    const parsedLog = this.parseLog(log)
                    if (parsedLog) {
                        await this.saveLog(parsedLog)
                        return true
                    }
                } catch(err) {
                    console.log('failed to save log due to', err)
                    console.log('error log:',log)
                    return false
                }
                return true
            })
            const results = await Promise.allSettled(allPromise)
            const count = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
            console.log(`${count} logs are saved into db`)
        } catch(error) {
            console.error('failed to process block ', blockNumber, ' due to:', error)
        }
    }

    private validate(log: Log) {
        if (log.topics.length !== 3) {
            throw new Error('log.topics.length !== 3')
        }
        if (!(log.data) || log.data === '0x') {
            throw new Error('log.data is empty')
        }
        if (log.data.length < 2 + 64) {
            throw new Error('log.data is not 64')
        }
    }

    private parseLog(log: Log) {
        const parsedLog = this.iface.parseLog({topics: log.topics, data: log.data})
        if (!parsedLog || parsedLog.name !== 'Transfer') return null
        const [from, to, value] = parsedLog.args
        return {
            eventName: 'Transfer',
            from: (from as string).toLowerCase(),
            to: (to as string).toLowerCase(),
            value: value.toString(),
            blockNumber: log.blockNumber,
            txHash: log.transactionHash,
            logIndex: log.index
        } as TransferLogType
    }

    private async saveLog(log: TransferLogType) {
        await TransferLog.findOneAndUpdate(
            {txHash: log.txHash, logIndex: log.logIndex},
            log, 
            {upsert: true, new: true, setDefaultsOnInsert: true}
        )
    }
}

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/shousi')
    const parser = new TransferLogParser('https://eth.llamarpc.com')
    await parser.processBlock(23980953)
}

main().catch((e) => console.log(e))