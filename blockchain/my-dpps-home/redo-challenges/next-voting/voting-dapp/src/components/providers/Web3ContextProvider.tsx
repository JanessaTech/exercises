'use client'
import { createContext, useContext } from "react"
import useWalletManager, { WalletStateType } from "../hooks/useWalletManager";

export interface IWeb3Context {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    state: WalletStateType
}

const WebContext = createContext<IWeb3Context | undefined>(undefined)
type Web3ContextProviderProps = {
    children: React.ReactNode
}
const Web3ContextProvider: React.FC<Web3ContextProviderProps> = ({children}) => {
    const {connect, disconnect, state} = useWalletManager()
    return <WebContext.Provider value={{connect, disconnect, state}}>
        {children}
    </WebContext.Provider>
}

export const useWeb3Context = () => useContext(WebContext)

export default Web3ContextProvider