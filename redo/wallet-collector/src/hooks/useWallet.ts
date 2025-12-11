import { ethers } from "ethers"
import { type } from "os"
import { useEffect, useState } from "react"

const useWallet = () => {
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [chainId, setChainId] = useState(1)
    const [isConnecting, setIsConnecting] = useState(false)

    const provider = typeof window?.ethereum === undefined ? null : new ethers.BrowserProvider(window.ethereum)

    useEffect(() => {
        (async () => {
            await fetchAccountInfo()
        })()
    }, [account, chainId])

    const fetchAccountInfo = async () => {
        if (!provider || account) return
        try {
            const balance = await provider.getBalance(account)
            setBalance(ethers.formatEther(balance))
        } catch(error) {
            console.log('failed to fetch account info: ', error)
        }
        
    }

    const connect = async () => {
        if (typeof window.ethereum === undefined) {
            console.log('Pls install MetaMask')
            return
        }
        try {
            setIsConnecting(true)
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}) as string[]
            if (accounts && accounts.length) {
                setAccount(accounts[0])
            }
        } catch(error) {
            console.log('failed to connect wallet:', error)
        } finally {
            setIsConnecting(false)
        }
        
    }
    const disconnect = async () => {
        setAccount('')
        setBalance('')
    }

    useEffect(() => {
        if (typeof window?.ethereum === undefined) return
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAccount(accounts[0])
        })
        window.ethereum.on('chainChanged', (network: string) => {
            setChainId(Number(network))
        })
        return () => {
            window.ethereum.removeAllListeners()
        }
    }, [])

    return {account, balance, chainId, isConnecting, connected: !!account, connect, disconnect}

}

export default useWallet