import { ethers } from "ethers"
import { useEffect, useState } from "react"


const useWallet = () => {
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [chainId, setChainId] = useState(1)
    const [isConnecting, setIsConnecting] = useState(false)
    const [error, setError] = useState('')

    const provider = window?.ethereum ? new ethers.BrowserProvider(window.ethereum): null

    useEffect(() => {
        fetchAccountInfo()
    }, [account, chainId])

    const fetchAccountInfo = async () => {
        console.log('fetchAccountInfo')
        if (!provider || !account) return
        try {
            const balance = await provider.getBalance(account)
            const network = await provider.getNetwork()
            setBalance(ethers.formatEther(balance))
            setChainId(Number(network))
        } catch(error) {
            console.log(error)
        }
    }

    const connect = async () => {
        if(typeof window.ethereum === undefined) {
            setError('Pls install MetaMask')
            return
        }
        try {
            setIsConnecting(true)
            setError('')
            const accounts = await window?.ethereum.request({method: 'eth_requestAccounts'}) as string[]
            console.log(accounts)
            if (accounts && accounts.length) {
                setAccount(accounts[0])
            }
        } catch (error: any) {
            setError(error.messsage || 'connection failed')
        } finally {
            setIsConnecting(false)
        }
    }

    const disconnect = async () => {
        setAccount('')
        setBalance('')
    }

    useEffect(() => {
        if (typeof window.ethereum === undefined) return

        const handleAccountsChanged = (accounts: string[]) => {
            console.log('handleAccountsChanged')
            setAccount(accounts[0])
        }
        const handleChainChanged = (network: string) => {
            console.log('handleChainChanged')
            setChainId(Number(network))
        }

        window.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.on('chainChanged', handleChainChanged)

        return () => {
            window.ethereum.removeAllListeners()
        }
    }, [])

    return {
        account, balance, chainId, isConnecting, error, isConnected: !!account,
        connect, disconnect, 
    }
}

export default useWallet