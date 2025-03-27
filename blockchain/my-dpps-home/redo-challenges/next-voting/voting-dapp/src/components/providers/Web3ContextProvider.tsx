'use client'

import { createContext, useContext } from "react";
import useWalletManager, { WalletStateType } from "../hooks/useWalletManager";

export interface IWeb3Context {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
    state: WalletStateType
}

const WebContext = createContext<IWeb3Context | undefined>(undefined)

type Web3ContextProviderProps = {
    children: React.ReactNode
}
const Web3ContextProvider: React.FC<Web3ContextProviderProps> = ({children})  => {
    const {connectWallet, disconnectWallet , state} = useWalletManager()
    return (
        <WebContext.Provider value={{connectWallet, disconnectWallet , state}}> 
            {children}
        </WebContext.Provider>
    )
}

export default Web3ContextProvider
export const useWeb3Context = () => useContext(WebContext)