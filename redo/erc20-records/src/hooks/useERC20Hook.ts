import { erc20abi } from "@/config/abi"
import { ethers } from "ethers"
import { off } from "process"

export type TransferLogType  = {
    from: string,
    to: string,
    value: string,
    blockNumber: number,
    transactionHash: string,
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
            console.log('failed to get balance')
            return ''
        }
    }

    const getRecentTransfers = async (offset: number = 2) => {
        try {
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const rawLogs = await contract.queryFilter(
                'Transfer',
                fromBlock, curBlock
            )
            const parsedLogs = rawLogs.map((log) => {
                if (!('args' in log) || (!(log?.args))) return null
                const [from, to, value] = log.args
                return {
                    from: from,
                    to: to,
                    value: value.toString(),
                    blockNumber: log.blockNumber,
                    transactionHash: log.transactionHash,
                    logIndex: log.index
                } as TransferLogType
            }).filter((t): t is  TransferLogType => t !== null).slice(-10)
            return parsedLogs
        } catch(error) {
            console.log('failed to get recent transfers', error)
            return []
        }
    }

    return {getBalance, getRecentTransfers}
}

export default useERC20Hook