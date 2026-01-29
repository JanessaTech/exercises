import { erc20abi } from "@/config/abi"
import { ethers } from "ethers"

export type TransferEventLog = {
    hash: string;
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
        try {
            const [balance, decimals] = await Promise.all([
                contract.balanceOf(walletAddress),
                contract.decimals()
            ])
            return ethers.formatUnits(balance, decimals)
        } catch(error) {
            console.log('failed to get balance:', error)
        }
        return ''
    }

    const getRecentTransferEventLogs = async (offset: number = 2) => {
        try {
            const curBlock = await provider.getBlockNumber()
            const fromBlock = curBlock - offset
            const logs = await contract.queryFilter(
                'Transfer',
                fromBlock, curBlock
            )
            const alltransfers = logs.map((log) => {
                if (!('args' in log) || !(log?.args)) return null
                const [from, to, value] = log.args
                return {
                    hash: log.transactionHash,
                    from: from,
                    to: to,
                    value: value.toString(),
                    blockNumber: log.blockNumber,
                    logIndex: log.index
                } as TransferEventLog
            }).filter((t): t is TransferEventLog => t !== null)
            return alltransfers.slice(-10)
        } catch (error) {
            console.error('Failed to get transfer logs:', error)
        }
        return []
    }

    return {getBalance, getRecentTransferEventLogs}

}

export default useERC20TransferLogHook