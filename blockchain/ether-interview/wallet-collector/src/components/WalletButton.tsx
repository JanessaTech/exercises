'use client'

import useWallet from "@/hook/useWallet"

const WalletButton = () => {
    const {account, balance, chainId, isConnected, isConnecting, error,
        connect, disconnect } = useWallet()
    
        const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`
        if (isConnecting){
            return (
                <button className="px-2 py-1 bg-zinc-500 rounded-full">Connecting....</button>
            )
        }
        if (isConnected) {
            return (
            <div>
                <button className="bg-zinc-500 px-2 py-1 rounded-full">
                    {formatAddress(account)} 
                    <span className="text-red-600 px-3">{Number(balance).toFixed(2)} eth</span>
                </button>
                <button className="bg-zinc-500 px-2 py-1 rounded-full" onClick={disconnect}> disconnect </button>
            </div>)
        }
        return (
            <button className="bg-zinc-500 px-2 py-1 rounded-full"
                onClick={connect}
                >
            Connect Wallet
            </button>
        )
}

export default WalletButton