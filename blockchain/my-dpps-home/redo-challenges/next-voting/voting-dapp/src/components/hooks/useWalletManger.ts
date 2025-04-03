import { useState } from "react"

type WalletState = {

}

const defaultState: WalletState = {}

const useWalletManager = () => {
    const [state, setState] = useState<WalletState>(defaultState)
    const connectWallet = async () => {

    }
    const disconnectWallet = async () => {

    }

    return {connectWallet, disconnectWallet, state}
}
export default useWalletManager