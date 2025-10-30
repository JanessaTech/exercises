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

    const switchTohardhat = async () => {
        const { ethereum } = window;

        // 首先切换到 Hardhat 网络
        try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }], // 31337 的十六进制
        });
        } catch (switchError: any) {
        // 如果网络不存在于 MetaMask，添加它
        if (switchError?.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                    chainId: '0x7A69',
                    chainName: 'Hardhat Local',
                    rpcUrls: ['http://127.0.0.1:8545/'],
                    nativeCurrency: {
                        name: 'Ethereum',
                        symbol: 'ETH',
                        decimals: 18,
                    },
                    },
                ],
                });
            }
        }
    }

    const connectWallet = async () => {
        console.log('connectWallet ...')
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            // fix bug in Metamask- sometimes, we cannot switch to hardhat network 
            // even though the current network in Metamask is hardhat
            await switchTohardhat() 
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

    console.log('walletstate+ ', state)

    return {connectWallet, disConnectWallet, state}

    
}

export default useWalletManager