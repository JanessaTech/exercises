import { JsonRpcProvider, ethers } from "ethers";
import { ERC20_ABI } from "./abi";
import mongoose from "mongoose";
import { TransferLog } from "./TransferModel";

type TransferLogType = {
    hash: string;
    from: string;
    to:string;
    value: string;
    blockNumber: number;
    logIndex: number
}

class TransferLogParser {
    private provider: JsonRpcProvider
    private iface = new ethers.Interface(ERC20_ABI)
    constructor(rpc: string) {
        this.provider = new ethers.JsonRpcProvider(rpc)
    }

    async proccessBlock(blockNumber: number) {
        try {
            const [block, logs] = await Promise.all([
                this.provider.getBlock(blockNumber),
                this.provider.getLogs({
                    fromBlock: blockNumber, toBlock: blockNumber,
                    topics: [ethers.id('Transfer(address,address,uint256)')]
                })
            ])
            if (!block) throw new Error('block not found')
            console.log(`${logs.length} logs are in block ${blockNumber}`)
            const allPromises = logs.map(async (log) => {
                try {
                    const parsedLog = this.parseLog(log)
                    if (parsedLog) {
                        await this.save(parsedLog)
                        return true
                    }
                } catch(err) {
                    console.error('Failed to parse log due to', err)
                    console.error(err)
                }
                return false

            })

            const results = await Promise.allSettled(allPromises)
            const cnt = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
            console.log(`${cnt} logs are saved for block ${blockNumber}`)
        } catch (error){
            console.error('Failed to proccess block', blockNumber)
        }
    }

    private parseLog(log: ethers.Log) {
        const parsedLog = this.iface.parseLog({data: log.data, topics: log.topics})
        if (!parsedLog || parsedLog.name !== 'Transfer') return null
        const [from, to, value] = parsedLog.args
        return {
            hash: log.transactionHash,
            from: (from as string).toLowerCase(),
            to: (to as string).toLowerCase(),
            value: value.toString(),
            blockNumber: log.blockNumber,
            logIndex: log.index
        } as TransferLogType
    }

    private async save(log: TransferLogType) {
        await TransferLog.findOneAndUpdate(
            {hash: log.hash, logIndex: log.logIndex},
            log,
            {upsert: true, new: true, setDefaultsOnInsert: true}
        )
    }
}

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/shousi')
    const parser = new TransferLogParser('https://eth-mainnet.public.blastapi.io')
    await parser.proccessBlock(24052856)
}

main().catch((e) => console.error(e))