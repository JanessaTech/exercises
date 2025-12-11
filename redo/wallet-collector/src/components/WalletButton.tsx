'use client'

import useWallet from "@/hooks/useWallet"
import { buffer } from "stream/consumers"

const WalletButton = () => {
    const {account, balance, chainId, isConnecting, connected, error, connect, disconnect} = useWallet()

    const formatAddress = (address: string) => `${address.slice(6)}...${address.slice(-4)}`

    if (isConnecting) {
        return (
            <button className="px-2 py-1 bg-zinc-600 rounded-full">Connecting....</button>
    
        )
    }
    if (connected) {
        return (
            <div>
                <button className="px-2 py-1 bg-zinc-600 rounded-full">
                    <span>{formatAddress(account)}</span>
                    <span>{Number(balance).toFixed(2)} eth</span>
                </button>
                <button className="px-2 py-1 bg-zinc-600 rounded-full" onClick={disconnect}>Disconnect</button>
            </div>
        )
    }

    return (
        <div>
            <button className="px-2 py-1 bg-zinc-600 rounded-full" onClick={connect}>Connect wallet</button>
        </div>
    )
        
}

export default WalletButton