'use client'
import { createContext, useContext } from "react"
import useWalletManager, { WalletState } from "../hooks/useWalletmanger"


export interface IWeb3Context {
    connectWallet: () => Promise<void>;
    disConnectWallet: () => Promise<void>
    state: WalletState
}

const Web3Context = createContext<IWeb3Context | undefined>(undefined)


type Web3ContextProviderProps = {
    children: React.ReactNode
}
const Web3ContextProvider: React.FC<Web3ContextProviderProps> = ({children}) => {
    const {connectWallet, disConnectWallet, state} = useWalletManager()
    return (
        <Web3Context.Provider value={{connectWallet, disConnectWallet, state}}>
            {children}
        </Web3Context.Provider>
    )
}

export default Web3ContextProvider
export const useWeb3Context = () => useContext(Web3Context)