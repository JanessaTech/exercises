import { abi, contractAddress } from "@/lib/ABI";
import { AuthState, authState } from "@/lib/Atoms";
import { Contract } from "ethers";
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

export interface WalletState {
    chainId: number | undefined;
    provider: ethers.BrowserProvider | undefined;
    signer: ethers.JsonRpcSigner | undefined;
    address: string | undefined;
    contract: Contract | undefined
}

const defaultWalletState: WalletState = {
    chainId: undefined,
    provider: undefined,
    signer: undefined,
    address: undefined,
    contract: undefined
}
const useWalletManager = () => {
    console.log('useWalletManager is called')
    const [state, setState] = useState<WalletState>(defaultWalletState)
    const [auth, setAuth] = useRecoilState<AuthState>(authState)

    useEffect(() => {
        if (typeof window.ethereum === "undefined") return;

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setState({ ...state, address: accounts[0] });
        });
    
        window.ethereum.on("chainChanged", (network: string) => {
          setState({ ...state, chainId: Number(network) });
        });
    
        return () => {
          window.ethereum.removeAllListeners();
        };
    }, [])

    const connectWallet = async () => {
        console.log('connectWallet ...')
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            const {ethereum} = window
            const provider = new ethers.BrowserProvider(ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const signer = await provider.getSigner()
            const address = await signer.getAddress()
            const chainId = Number((await provider.getNetwork()).chainId)
            const contract = new Contract(contractAddress, abi, signer)
            setState({...state, chainId: chainId, provider: provider, signer: signer, address: address, contract: contract})
            setAuth({connected: true})
        } else {
            console.error('window or window.ethereum cannot be found')
        }
    }
    const disConnectWallet = async () => {
        console.log('disConnectWallet ...')
        setAuth({connected: false})
    }

    return {connectWallet, disConnectWallet, state}
}

export default useWalletManager