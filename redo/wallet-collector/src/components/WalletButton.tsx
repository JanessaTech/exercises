
import useWallet from "@/hooks/useWallet"

const WalletButton = () => {
    const {account, balance, chainId, connected, isConnecting, connect, disconnect} = useWallet()
    const format = (address: string) => `${address.slice(0, 10)}...${address.slice(-10)}`

    if (isConnecting) {
        return (
            <div>
                <button className="px-2 py-1 bg-zinc-600 text-white rounded-full">Collecting...</button>
            </div>
        )
    }
    if (connected) {
        return (
            <div>
                <button className="px-2 py-1 bg-zinc-600 text-white rounded-full">
                    <span>{format(account)}</span>
                    <span>{Number(balance).toFixed(2)}</span>
                </button>
                <button className="px-2 py-1 bg-zinc-600 text-white rounded-full" onClick={disconnect}>Disconnect</button>
            </div>
        )
    }
    return (
        <div>
            <button className="px-2 py-1 bg-zinc-600 text-white rounded-full" onClick={connect}>Collect wallet</button>
        </div>
    )
}

export  default WalletButton