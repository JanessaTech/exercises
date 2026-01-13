import { erc20abi } from "@/config/abi"
import { ethers } from "ethers"

export type TransferLogType  = {
    blockNumber: number;
    txHash: string;
    logIndex: number;
    from: string;
    to: string;
    value: string
}

const useERC20Hook = (tokenAddress: `0x${string}`, walletAddress: `0x${string}`) => {
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')
    const contract = new ethers.Contract(tokenAddress, erc20abi, provider)

    const getBalance = async () => {
        try {
            const balance = await contract.balanceOf(walletAddress)
            const decimals = await contract.decimals()
            return ethers.formatUnits(balance, decimals)
        } catch (error) {
            console.error('Failed to get balance:', error)
        }
        return ''
    }

    const getRecentTransferLog = async (offset: number = 2) => {
        try {
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const logs = await contract.queryFilter(
                'Transfer',
                fromBlock, curBlock
            )
            const allTransfers = logs.map((log) => {
                if (!('args' in log) || !(log.args)) return null
                const [from, to, value] = log.args
                return {
                    blockNumber: log.blockNumber,
                    txHash: log.transactionHash,
                    logIndex: log.index,
                    from: from,
                    to: to,
                    value: value.toString()
                } as TransferLogType
            }).filter((f) : f is TransferLogType => f !== null)
            return allTransfers.slice(-10)
        } catch (error) {
            console.error('Failed to get recent transfer logs due to:', error)
        }
        return []
    }

    return {getBalance, getRecentTransferLog}
}

export default useERC20Hook