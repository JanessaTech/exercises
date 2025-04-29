import { useState } from "react"


type WalletState = {

}
const defaultWalletStatement: WalletState = {

}

const useWalletManager = () => {
    const [state, setState] = useState<WalletState>(defaultWalletStatement)
    const connectWallet = async () => {
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            const {ethereum} = window
        } else {
            console.log('Pls install MetaMask')
        }
    }
    const disconnectWallet = async () => {

    }
    return {connectWallet, disconnectWallet, state}
}

export default useWalletManager