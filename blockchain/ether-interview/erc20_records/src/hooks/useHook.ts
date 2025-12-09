import { erc20abi } from "@/config/abi"
import { EventLog, Log } from "ethers"
import { ethers } from "ethers"

export interface TransferEvent {
    from: string;
    to: string;
    value: bigint,
    blockNumber: number;
    transactionHash: string;
}

const useHook = (tokenAddress: `0x${string}`, walletAddress: `0x${string}`) => {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')
    const tokenContract = new ethers.Contract(tokenAddress, erc20abi, provider)

    const getBalance = async () => {
        try {
            const [balance, decimals] = await Promise.all([
                tokenContract.balanceOf(walletAddress),
                tokenContract.decimals()
            ])
            const formattedBalance = ethers.formatUnits(balance, decimals)
            return formattedBalance
        } catch(error: any) {
            console.log('failed to get balance:', error.message)
            return ''
        }
    }

    const getRecentTransfers = async (offset: number = 2) => {
        try {
            const currentBlock = await provider.getBlockNumber()
            const fromBlock = currentBlock - offset
            const transferEvents:(Log | EventLog)[] = await tokenContract.queryFilter(
                'Transfer',
                fromBlock, currentBlock
            )
            const allTransfers = transferEvents
                                        .map((e: Log | EventLog) => {
                                            if (!('args' in e) || !(e?.args)) {
                                                return null
                                            }
                                            const args = e.args as any
                                            const from = args[0]?.toLowerCase()
                                            const to = args[1]?.toLowerCase()
                                            return {
                                                from: from,
                                                to: to,
                                                value: args[2],
                                                blockNumber: e.blockNumber,
                                                transactionHash: e.transactionHash
                                            } as TransferEvent
                                        }).filter((transfer) : transfer is TransferEvent => transfer !== null)
            const recentTransfers: TransferEvent[] = allTransfers.slice(-10)
            return recentTransfers
        } catch(error: any) {
            console.log('failed to get recent transfer records', error)
        }
    }
    return {getBalance, getRecentTransfers}
}

export default useHook