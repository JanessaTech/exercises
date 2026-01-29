'use client'

import { createContext, useContext } from "react"
import useWalletManager, { WalletState } from "../hooks/useWalletManager";

export interface Iweb3Context {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    state: WalletState
}
const Web3Context = createContext<Iweb3Context | undefined>(undefined)

type Web3ContextProviderProps = {children: React.ReactNode}
const Web3ContextProvider:React.FC<Web3ContextProviderProps> = ({children}) => {
    const {connect, disconnect, state} = useWalletManager()
    return (
        <Web3Context.Provider value={{connect, disconnect, state}}>
            {children}
        </Web3Context.Provider>
    )
}
export const useWeb3Context = () => useContext(Web3Context)
export default Web3ContextProvider