import { abi, contractAddress } from "@/lib/ABI"
import { authState } from "@/lib/Atoms";
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

export type WalletState = {
    chainId: Number | undefined;
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
    const [auth, setAuth] = useRecoilState(authState)

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
        if (typeof window !== undefined && typeof window.ethereum !== undefined) {
            await switchTohardhat()
            const {ethereum} = window
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const provider = new ethers.BrowserProvider(ethereum)
            const signer = await provider.getSigner()
            const address = await signer.getAddress()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            const chainId = Number((await provider.getNetwork()).chainId)
            console.log('chainId=', chainId)
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
    }, [])

    console.log(state)

    return {connectWallet, disconnectWallet, state}

}

export default useWalletManager