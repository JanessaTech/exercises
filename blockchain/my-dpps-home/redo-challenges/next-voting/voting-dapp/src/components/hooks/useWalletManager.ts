import { abi, contractAddress } from "@/lib/ABI"
import { AuthState, authState } from "@/lib/Atoms"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export type WalletState = {
    chainId: number | undefined;
    provider: ethers.BrowserProvider | undefined;
    signer: ethers.JsonRpcSigner | undefined;
    address: string | undefined;
    contract: ethers.Contract | undefined
}
const defaultWalletState: WalletState = {
    chainId: undefined,
    provider: undefined,
    signer: undefined,
    address: undefined,
    contract: undefined
}
const useWalletManager = () => {
    const [state, setState] = useState<WalletState>(defaultWalletState)
    const [auth, setAuth] = useRecoilState<AuthState>(authState)

    const connectWallet = async () => {
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            const {ethereum} = window
            const provider = new ethers.BrowserProvider(ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const signer = await provider.getSigner()
            const address = await signer.getAddress()
            const chainId = Number((await provider.getNetwork()).chainId)
            const contract = new ethers.Contract(contractAddress, abi, signer)
            setState({chainId: chainId, provider: provider, signer: signer, address: address, contract: contract})
            setAuth({connected: true})

        } else {
            console.log('Pls install MetaMask')
        }
    }

    const disconnectWallet = async () => {
        setAuth({connected: false})
    }

    useEffect(() => {
        if (typeof window === undefined || typeof window.ethereum === undefined) return
        window.ethereum.on('chainChanged', (network: string) => {
            setState({...state, chainId: Number(network)})
        })
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setState({...state, address: accounts[0]})
        })
        return () => {
            window.ethereum.removeAllListeners()
        }
    })

    return {connectWallet, disconnectWallet, state}
}
export default useWalletManager