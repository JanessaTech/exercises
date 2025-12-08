import { ethers } from "ethers"
import { useEffect } from "react"


const useWallet = () => {

    const provider = window?.ethereum ? new ethers.BrowserProvider(window.ethereum): null

    const fetchAccountInfo = async () => {
        if (!provider ) {}
    }
    const connect = async () => {

    }
    const disconnect = async () => {

    }
    const switchNetwork = async (chainId: string) => {

    }

    useEffect(() => {

        return () => {

        }
    }, [])
}

export default useWallet