import { ethers, Log } from "ethers";
import { ERC20_ABI } from "./abi";
import mongoose from "mongoose";
import TransferLog from "./TransferModel";

type TransferLogType = {
    eventName: string;
    from:string;
    to: string;
    value: string;
    contractAddress: string;
    txHash: string;
    blockNumber: number;
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
                    fromBlock: blockNumber,toBlock:blockNumber,
                    topics:[ethers.id('Transfer(address,address,uint256)')]
                })
            ])
            if (!block) throw new Error('block not found')
            const transferPromise = logs.map(async (log) => {
                try {
                    this.validate(log)
                    const parsedLog = await this.parseLog(log)
                    if (parsedLog) {
                        await this.saveTransferLog(parsedLog)
                        return true
                    }
                } catch(err) {
                    console.log('failed to save log due to', err)
                    return false
                }
                return false
            })

            const results = await Promise.allSettled(transferPromise)
            const count = results.filter((r) => r.status == 'fulfilled' && r.value === true).length
            console.log(`${count} logs are saved`)
        } catch(error) {
            console.log('failed to process block', blockNumber, ' due to :', error)
        }
    }

    private validate(log: Log) {
        if (log.topics.length !== 3) {
            throw new Error('log.topics.length !== 3')
        }
        if (!(log.data) || log.data ==='0x') {
            throw new Error('log data is empty')
        }
        if (log.data.length < 2 + 64) {
            throw new Error('log.data is not 64')
        }
    }
    private parseLog(log: Log) {
        const parsedLog = this.iface.parseLog({topics: log.topics, data: log.data})
        if (!parsedLog || parsedLog.name !== 'Transfer') return null
        const [from, to, value] = parsedLog.args
        const contractAddress = log.address
        return {
            eventName: 'Transfer',
            from: (from as String).toLowerCase(),
            to: (to as String).toLowerCase(),
            value: value.toString(),
            contractAddress: contractAddress.toLowerCase(),
            txHash: log.transactionHash,
            logIndex: log.index
        } as TransferLogType
    }
    private async saveTransferLog(log: TransferLogType) {
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