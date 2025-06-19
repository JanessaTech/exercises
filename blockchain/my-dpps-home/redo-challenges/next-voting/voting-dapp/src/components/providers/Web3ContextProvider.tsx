'use client'
import { createContext, useContext } from "react";
import useWalletManager, { WalletState } from "../hooks/useWalletManager";

export interface IWeb3Context {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
    state: WalletState
}

const Web3Conext = createContext<IWeb3Context | undefined>(undefined)

type Web3ContextProviderProps ={
    children: React.ReactNode
}
const Web3ContextProvider: React.FC<Web3ContextProviderProps> = ({children}) => {
    const {connectWallet, disconnectWallet, state} = useWalletManager()
    return (
        <Web3Conext.Provider value={{connectWallet, disconnectWallet, state}}>
            {children}
        </Web3Conext.Provider>
    )
}

export const useWeb3Context = () => useContext(Web3Conext)

export default Web3ContextProvider