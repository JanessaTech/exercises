import { AuthState, ConnectState, authState } from "@/lib/Atoms";
import { ethers } from "ethers"
import { useState } from "react"
import { useRecoilState } from "recoil";

export interface WalletState {
    chainId: number | undefined;
    provider: ethers.BrowserProvider | undefined;
    signer: ethers.JsonRpcSigner | undefined;
    address: string | undefined;
    isAuthenticated: boolean;
}

const defaultWalletState: WalletState = {
    chainId: undefined,
    provider: undefined,
    signer: undefined,
    address: undefined,
    isAuthenticated: false
}
const useWalletManager = () => {
    console.log('useWalletManager is called')
    const [state, setState] = useState<WalletState>(defaultWalletState)
    const [auth, setAuth] = useRecoilState<AuthState>(authState)

    const connectWallet = async () => {
        console.log('connectWallet ...')
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            const {ethereum} = window
            const provider = new ethers.BrowserProvider(ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const signer = await provider.getSigner()
            const address = await signer.getAddress()
            const chainId = Number((await provider.getNetwork()).chainId)
            console.log('address: ', address)
            console.log('chain: ', chainId)
        } else {
            console.error('window or window.ethereum cannot be found')
        }
    }
    const disConnectWallet = async () => {
        console.log('disConnectWallet ...')
    }

    return {connectWallet, disConnectWallet, state}
}

export default useWalletManager