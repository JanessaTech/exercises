'use client'
import useWallet from "@/hooks/useWallet"

const WalletButton = () => {
    const {account, balance, chainId, connect, disconnect, connected, isConnecting} = useWallet()


    const formatAddress = (address: string) => `${address.slice(5)}...${address.slice(-4)}`
    if (isConnecting) {
        return (
            <div><button className="px-2 py-2 bg-zinc-600 text-white rounded-full">Connecting</button></div>
        )
    }
    if (connected) {
        return (
            <div>
                <button className="px-2 py-2 bg-zinc-600 text-white rounded-full">
                    <span>{formatAddress(account)}</span>
                    <span>{Number(balance).toFixed(2)}</span>
                </button>
                <button className="px-2 py-2 bg-zinc-600 text-white rounded-full" onClick={disconnect}>Disconnect</button>
            </div>
        )
    }
    return (
        <div>
            <button className="px-2 py-2 bg-zinc-600 text-white rounded-full" onClick={connect}>Connect Wallet</button>
        </div>
    )
}
export default WalletButton