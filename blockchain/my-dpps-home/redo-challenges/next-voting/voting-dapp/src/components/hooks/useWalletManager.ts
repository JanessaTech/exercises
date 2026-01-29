import { abi, contractAddress } from "@/lib/ABI";
import { authState } from "@/lib/Atoms";
import { ethers } from "ethers";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

export type WalletState = {
    chainId: number | undefined;
    provider: ethers.BrowserProvider | undefined;
    signer: ethers.JsonRpcSigner | undefined;
    address: string | undefined;
    contract: ethers.Contract | undefined;
}

const defaultWalletState: WalletState = {
    chainId: undefined,
    provider: undefined,
    signer: undefined,
    address: undefined,
    contract: undefined
}

const useWalletManager = () => {
    const [state, setState] = useState(defaultWalletState)
    const [auth, setAuth] = useRecoilState(authState)

    const connect = async () => {
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            const {ethereum} = window
            const provider = new ethers.BrowserProvider(ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const signer = await provider.getSigner()
            const chainId = Number((await provider.getNetwork()).chainId)
            console.log('chainId=', chainId)
            const address  = await signer.getAddress()
            const contract = new ethers.Contract(contractAddress, abi, provider)
            setState({chainId: chainId, provider: provider, signer: signer, address: address, contract: contract})
            setAuth({connected: true})
        } else {
            console.log('Pls install MetaMask')
        }
    }
    const disconnect = async () => {
        setAuth({connected: false})
    }

    useEffect(() => {
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

    return {connect, disconnect, state}

}

export default useWalletManager