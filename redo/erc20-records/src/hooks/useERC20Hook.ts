import { erc20abi } from "@/config/abi"
import { ethers } from "ethers"

export type TransferLog = {
    hash: string;
    from: string;
    to: string;
    value: string;
    blockNumber: number;
    logIndex: number
}

const useERC20Hook = (tokenAddress: `0x${string}`, walletAddress:`0x${string}`) => {
    const provider = new ethers.JsonRpcProvider('https://eth-mainnet.public.blastapi.io')
    const contract = new ethers.Contract(tokenAddress, erc20abi, provider)

    const getBalance = async () => {
        try {
            const balance = await contract.balanceOf(walletAddress)
            const decimals = await contract.decimals()
            return ethers.formatUnits(balance, decimals)
        } catch(error){
            console.error('Failed to get balance:', error)
        }
        return ''
    }

    const getRecentTransferLogs = async (offset: number = 2) => {
        try {
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const rawLogs = await contract.queryFilter(
                'Transfer', 
                fromBlock, curBlock
            )

            const allTransferLogs = rawLogs.map((log) => {
                if (!('args' in log) || !(log?.args)) return null
                const [from, to, value] = log.args
                return {
                    hash:log.transactionHash,
                    from: from,
                    to: to,
                    value: value.toString(),
                    blockNumber: log.blockNumber,
                    logIndex: log.index
                } as TransferLog
            }).filter((t): t is TransferLog => t !== null)

            return allTransferLogs.slice(-10)
        } catch (error) {
            console.error('Failed tp get recent transfer logs', error)
        }
        return []
    }

    return {getBalance, getRecentTransferLogs}
}

export default useERC20Hook