import { abi, contractAddress } from "@/lib/ABI"
import { authState } from "@/lib/Atoms";
import { JsonRpcSigner, BrowserProvider, Contract } from "ethers";
import { ethers } from "ethers"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export type WallteState = {
    chainId: number | undefined;
    provider: BrowserProvider | undefined;
    signer: JsonRpcSigner | undefined,
    contract: Contract | undefined,
    address: string | undefined
}
const defaultWalletState: WallteState = {
    chainId: undefined,
    provider: undefined,
    signer: undefined,
    contract: undefined,
    address: undefined
}

const useWalletManager = () => {
    const [state, setState] = useState<WallteState>(defaultWalletState)
    const [auth, setAuth] = useRecoilState(authState)

    const connect = async () => {
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            const {ethereum} = window
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const provider = new ethers.BrowserProvider(ethereum)
            const signer = await provider.getSigner()
            const address = await signer.getAddress()
            const contract = new Contract(contractAddress, abi, signer)
            const chainId = Number((await provider.getNetwork()).chainId)
            setState({chainId: chainId, provider: provider, signer: signer, contract: contract, address: address})
            setAuth({connected: true})
        } else {
            console.log('Pls install MetaMask')
        }
    }
    const disconnect = async () => {
        setAuth({connected: false})
    }

    useEffect(() => {
        if (typeof window?.ethereum === undefined) return
        window.ethereum.on('chainChanged', (network: string) => {
            setState({...state, chainId: Number(network)})
        })
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setState({...state, address: accounts[0]})
        })
    }, [])
    return {connect, disconnect, state}
}

export default useWalletManager