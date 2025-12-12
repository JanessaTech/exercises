import { erc20abi } from "@/config/abi";
import { Block } from "ethers";
import { ethers, Log, EventLog } from "ethers";


export type TransferLogType  = {
    from: string;
    to: string;
    value: bigint;
    blockNumber: number;
    txHash: string;
    logIndex: number
}

const useERC20Hook = (tokenAddress: `0x${string}`, walletAddress: `0x${string}`) => {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')
    const contract = new ethers.Contract(tokenAddress, erc20abi, provider)

    const getBalance = async () => {
        try {
            const balance = await contract.balanceOf(walletAddress)
            const decimals = await contract.decimals()
            return ethers.formatUnits(balance, decimals)
        } catch(error) {
            console.log('failed to get balance:', error)
        }
        return ''
    }

    const getRecentTransfers = async (offset: number = 2)=> {
        try {
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const rawlogs: (Log | EventLog)[] = await contract.queryFilter(
                'Transfer',
                fromBlock, curBlock
            ) 
            const parsedLogs  = rawlogs.map((log: (Log | EventLog)) => {
                if (!('args' in log) || !(log?.args)) return null
                const [from, to, value] = log.args
                return {
                    from: from,
                    to: to,
                    value: value,
                    blockNumber: log.blockNumber,
                    txHash: log.transactionHash,
                    logIndex: log.index
                } as TransferLogType
            }).filter((log): log is TransferLogType => log !== null)
            return parsedLogs.slice(-10)
        } catch(error) {
            console.log('failed to get recent transfers due to:', error)
        }
        return []
    }

    return {getBalance, getRecentTransfers}
}

export default useERC20Hook