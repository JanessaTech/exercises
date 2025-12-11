import { ethers } from "ethers"
import { useEffect, useState } from "react"

const useWallet = () => {
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [chainId, setChainId] = useState(1)
    const [isConnecting, setIsConnecting] = useState(false)
    const [error, setError] = useState('')

    const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum): null

    useEffect(() => {
        (async () => {
            await fetchAccountInfo()
        })()
    }, [account, chainId])

    const fetchAccountInfo = async () => {
        if (!provider || !account) return
        try {
            const balance = await provider.getBalance(account)
            const chainId = Number((await provider.getNetwork()).chainId)
            setBalance(ethers.formatEther(balance))
            setChainId(chainId)
        } catch (error) {
            console.log('failed to fetch account info:', error)
        }
    }

    const connect = async () => {
        if (typeof window?.ethereum === undefined) {
            setError('Pls install MetaMask')
            return
        }

        try {
            setError('')
            setIsConnecting(true)
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}) as string[]
            if (accounts && accounts.length) {
                setAccount(accounts[0])
            }
        } catch(error: any) {
            setError(error.message || 'Failed to connect')
        } finally{
            setIsConnecting(false)
        }

    }

    const disconnect = async () => {
        setAccount('')
        setBalance('')
    }

    useEffect(() => {
        if (typeof window?.ethereum === undefined) return

        window.ethereum.on('chainChanged', (network: string) => {
            setChainId(Number(chainId))
        })
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAccount(accounts[0])
        })

        return () => {
            window.ethereum.removeAllListeners()
        }
    }, [])

    return {account, balance, chainId, isConnecting, connected: !!account, error,
            connect, disconnect
            }
}

export default useWallet