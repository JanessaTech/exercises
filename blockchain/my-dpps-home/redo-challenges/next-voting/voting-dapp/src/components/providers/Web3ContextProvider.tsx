'use client'

import { createContext, useContext } from "react";
import useWalletManager, { WallteState } from "../hooks/useWalletManger";

export interface IWeb3Context {
    connect: () => Promise<void>;
    disconnect : () => Promise<void>;
    state: WallteState
}

const Web3Context = createContext<IWeb3Context | undefined>(undefined)

type Web3ContextProviderProps = {
    children: React.ReactNode
}
const Web3ContextProvider: React.FC<Web3ContextProviderProps> = ({children}) => {
    const {connect, disconnect, state} = useWalletManager()
    return (
        <Web3Context.Provider value={{connect, disconnect, state}}>
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3Context = () => useContext(Web3Context)

export default Web3ContextProvider