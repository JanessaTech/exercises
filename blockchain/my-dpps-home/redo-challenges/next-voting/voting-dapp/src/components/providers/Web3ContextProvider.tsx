'use client'

import { createContext, useContext } from "react";
import useWalletManager, { WalletState } from "../hooks/useWalletManager";

export interface IWeb3Context {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
    state: WalletState
}
const Web3Context = createContext<IWeb3Context | undefined>(undefined)

type WebContextProviderProps = {
    children: React.ReactNode
}
const WebContextProvider: React.FC<WebContextProviderProps> = ({children}) => {
    const {connectWallet, disconnectWallet, state} = useWalletManager()
    return (
        <Web3Context.Provider value={{connectWallet, disconnectWallet, state}}>
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3Context = () => useContext(Web3Context)

export default WebContextProvider