import { Log, ethers } from "ethers";
import { ERC20_ABI } from "./abi";
import mongoose from "mongoose";
import TransferLog from "./TransferModel";

type TransferLogType = {
    eventName: string;
    from: string;
    to:string;
    value:string;
    blockNumber: number;
    txHash: string;
    logIndex: number
}

class ParserTransfer {
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
            if (!block) throw Error('no block found')
            console.log(`${logs.length} logs are in block ${blockNumber}`)
            const allTransfers = logs.map(async (log) => {
                try {
                    const parsed = this.parseLog(log)
                    if (parsed) {
                        await this.save(parsed)
                        return true
                    }
                } catch(err) {
                    console.error(`Failed to parse log:`, log)
                    console.error(`due to: `, err)
                }
                return false
            })

            const results = await Promise.allSettled(allTransfers)
            const cnt = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
            console.log(`${cnt} logs are saved`)
        } catch(error) {
            console.error(`Failed to process block ${blockNumber} due to:`, error)
        }
    }

    parseLog(log: Log) {
        const parsedLog = this.iface.parseLog({data: log.data, topics: log.topics})
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

    async save(log: TransferLogType) {
        await TransferLog.findOneAndUpdate(
            {txHash: log.txHash, logIndex: log.logIndex},
            log,
            {upsert: true, new: true, setDefaultsOnInsert: true}
        )
    }
}

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/shousi')
    const parser = new ParserTransfer('https://eth.llamarpc.com')
    await parser.processBlock(24224007)
}
main().catch((e) => console.error(e))