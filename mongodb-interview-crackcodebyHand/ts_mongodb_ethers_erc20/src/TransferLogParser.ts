import { ethers, Log } from "ethers";

class TransferLogParser {
    private provider: ethers.JsonRpcProvider
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
            const transferPromises = logs.map(async (log) => {
                try {
                    const parsedLog = await this.parseTransferLog(log)
                    if(parsedLog) {
                        await this.saveTransferData(parsedLog)
                        return true
                    }
                } catch(err) {
                    console.log('failed to parse log:', err)
                    return false
                }
                return false
            })

            const results = await Promise.allSettled(transferPromises)
            


        } catch(error) {
            console.log(`Failed to process block ${blockNumber}`, error)
        }
    }

    private async parseTransferLog(log: Log) {
        return {}
    }

    private async saveTransferData(data: any) {

    }
}