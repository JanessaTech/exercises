import { erc20abi } from "@/config/abi"
import { ethers } from "ethers"

export type TransferLog  = {
    txHash: string;
    from: string;
    to: string;
    value: string;
    blockNumber: number;
    logIndex: number
}

const useERC20TransferLogHook = (tokenAddress: `0x${string}`, walletAddress:`0x${string}`) => {
    const provider = new ethers.JsonRpcProvider('https://eth-mainnet.public.blastapi.io')
    const contract = new ethers.Contract(tokenAddress, erc20abi, provider)
    
    const getBalance = async () => {
        try{
            const balance = await contract.balanceOf(walletAddress)
            const decimals = await contract.decimals()
            return ethers.formatUnits(balance, decimals)
        } catch(error) {
            console.error('failed to get balance due to:', error)
        }
        return ''
    }

    const getRecenTransferLogs = async (offset: number = 2) => {
        try {
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const logs = await contract.queryFilter(
                'Transfer',
                fromBlock, curBlock
            )

            const allTransfers = logs.map((log) => {
                if (!('args' in log) || !(log?.args)) return null
                const [from, to, value] = log.args
                return {
                    from: from,
                    to: to,
                    value: value.toString(),
                    txHash: log.transactionHash,
                    blockNumber: log.blockNumber,
                    logIndex: log.index
                } as TransferLog
            }).filter((t): t is TransferLog => t !== null)
            return allTransfers.slice(-10)
        } catch (error) {
            console.error('Failed to get recent transfer logs:', error)
        }
        return []
    }

    return {getBalance, getRecenTransferLogs}
}

export default useERC20TransferLogHook