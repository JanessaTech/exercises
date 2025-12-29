import { ethers, Log } from "ethers"
import { ERC20_ABI } from "./abi"
import mongoose from "mongoose"
import TransferLog from "./TransferModel";

type TransferLogType = {
    eventName: string,
    from: string;
    to: string;
    value: string;// wei
    blockNumber: number,
    txHash: string;
    logIndex: number;
}

class TransferLogParser {
    private provider!: ethers.JsonRpcProvider
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
                })])
            if (!block) return new Error('bo block found')
            console.log(`${logs.length} logs in block ${blockNumber}`)
            const alltransfers = logs.map(async (log) => {
                try {
                    const parsed = this.parseLog(log)
                    if (parsed) {
                        await this.save(parsed)
                        return true
                    }
                } catch(error) {
                    console.error('failed to save log:', error)
                    console.error('log:', log)
                }
                return false
            })
            const results = await Promise.allSettled(alltransfers)
            const savedCnt = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
            console.log(`${savedCnt} logs ared saved`)
        } catch(error) {
            console.error('failed to process block', error)
        }
    }

    private parseLog(log: Log) {
        const parsedLog = this.iface.parseLog({data: log.data, topics: log.topics})
        if (!parsedLog || parsedLog.name !== 'Transfer') return null
        const [from, to, value] = parsedLog.args
        return {
            eventName: 'Transfer',
            from: (from as string).toLowerCase(),
            to: (to as string).toLocaleLowerCase(),
            value: value.toString(),
            blockNumber: log.blockNumber,
            txHash: log.transactionHash,
            logIndex: log.index
        } as TransferLogType
    }

    private async save(log: TransferLogType) {
        await TransferLog.findOneAndUpdate(
            {txHash: log.txHash, logIndex: log.logIndex},
            log,
            {upsert: true, new: true, setDefaultsOnInsert: true}
        )
    }
}

async function main() {
    const parser= new TransferLogParser('https://eth.llamarpc.com')
    await mongoose.connect('mongodb://127.0.0.1/shousi')
    await parser.processBlock(24052856)
}

main().catch((e) => console.error(e))