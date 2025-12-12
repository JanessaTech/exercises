import { erc20abi } from "@/config/abi"
import { EventLog, Log } from "ethers"
import { ethers } from "ethers"

export interface TransferEventType {
    from: string;
    to: string;
    value: bigint;
    blockNumber: number;
    txHash: string;
    logIndex: number
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
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const rawLogs: (Log | EventLog)[] = await tokenContract.queryFilter(
                'Transfer',
                fromBlock, curBlock
            )
            const parsedLogs = rawLogs.map((log: (Log | EventLog)) => {
                if (!('args' in log) || !(log?.args)) return null
                const [from, to, value] = log.args
                return {
                    from: from,
                    to: to, 
                    value: value,
                    blockNumber: log.blockNumber,
                    txHash: log.transactionHash,
                    logIndex: log.index
                } as TransferEventType
            }).filter((log): log is TransferEventType => log !== null)
            return parsedLogs.slice(-10)
        } catch(error) {
            console.log('failed to get recent transfer:', error)
        }
        return []
    }
    return {getBalance, getRecentTransfers}
}

export default useHook