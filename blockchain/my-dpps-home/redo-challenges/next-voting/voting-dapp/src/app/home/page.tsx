'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"


type HomeProps = {}
const Home:React.FC<HomeProps> = () => {
    const {connectWallet, disconnectWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}

export default Home