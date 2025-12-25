import { ethers, Log } from "ethers"
import mongoose from "mongoose"
import { ERC20_ABI } from "./abi"
import TransferLog from "./TransferModel";

type TransferLogType = {
    eventName: string;
    from: string;
    to: string;
    value: string; //wei
    blockNumber: number;
    txHash: string;
    logIndex: number
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
                })
            ])
            if (!block) throw new Error('the block not found')
            console.log(`${logs.length} logs in block ${blockNumber}`)

            const allTransfer = logs.map(async (log) => {
                try {
                    const parsedLog = this.parseLog(log)
                    if (parsedLog) {
                        await this.save(parsedLog)
                        return true
                    }
                } catch (err) {
                    console.error('failed to save log: ', err)
                    console.log('log:', log)
                }
                return false
                
            })

            const results  = await Promise.allSettled(allTransfer)
            const cnt = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
            console.log(`${cnt} logs are saved`)
        } catch(error){
            console.error('failed to process block:', blockNumber, 'due to:', error)
        }
    }

    private parseLog(log: Log){
        const parsedLog = this.iface.parseLog({topics: log.topics, data: log.data})
        if (!parsedLog || parsedLog.name !== 'Transfer') return null
        const [from, to, value] = parsedLog.args
        return {
            eventName:'Transfer',
            from: (from as string).toLowerCase(),
            to: (to as string).toLowerCase(),
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
    await mongoose.connect('mongodb://127.0.0.1/shousi')
    const parser = new TransferLogParser('https://eth.llamarpc.com')
    await parser.processBlock(24052856)
}
main().catch((e) => {
    console.error(e)
})