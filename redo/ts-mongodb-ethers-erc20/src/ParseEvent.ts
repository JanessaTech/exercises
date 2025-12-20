import { ethers,  Log} from "ethers";
import { ERC20_ABI } from "./abi";
import mongoose from "mongoose";
import TransferLog from "./TransferModel";

type TransferLogType = {
    eventName: string;
    from: string;
    to: string;
    value: string;//wei;
    blockNumber: number;
    txhash: string;
    logIndex: number;
}

class TransferLogParser {
    private provider:ethers.JsonRpcProvider
    private iface = new ethers.Interface(ERC20_ABI)
    constructor(rpc: string) {
        this.provider = new ethers.JsonRpcProvider(rpc)
    }

    async processBlockNumber(blockNumber: number) {
        try {
            const [block, logs] = await Promise.all([
                this.provider.getBlock(blockNumber),
                this.provider.getLogs({
                    fromBlock: blockNumber, toBlock: blockNumber,
                    topics: [ethers.id('Transfer(address,address,uint256)')]
                })
            ])
            if (!block) throw new Error('block not found')
            console.log(`${logs.length} logs for block ${blockNumber}`)
            const allTransfers = logs.map(async (log) => {
                try {
                    const parsedLog = this.parseLog(log)
                    if (parsedLog) {
                        await this.save(parsedLog)
                        return true
                    }
                } catch(err){
                    console.log('failed to parse log:', err)
                    console.log('log:', log)
                    return false
                }
                return false
            })
            const results = await Promise.allSettled(allTransfers)
            const processedAccount = results.filter((r) => r.status === 'fulfilled' && r.value == true).length
            console.log(`${processedAccount} logs are saved`)
        } catch (error) {
            console.log(`Failed to process block ${blockNumber}`)
        }
    }

    private async save(log: TransferLogType) {
        await TransferLog.findOneAndUpdate(
            {txhash: log.txhash, logIndex: log.logIndex},
            log,
            {upsert: true, new: true, setDefaultsOnInsert: true}
        )
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
            txhash: log.transactionHash,
            logIndex: log.index
        } as TransferLogType
    }
}

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/shousi') 
    const parser = new TransferLogParser('https://eth.llamarpc.com')
    await parser.processBlockNumber(24052856)
}

main().catch((e) => console.error(e))