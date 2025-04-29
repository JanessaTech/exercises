'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider";
import { useState } from "react";

type Candidate = {
    id: number;
    name: string;
    votedBy: string
}
type HomeState  = {
    isEnded: boolean;
    candidates: Candidate[]
}

const defaultHomeState: HomeState = {
    isEnded: false,
    candidates: []
}


type HomeProps = {}
const Home:React.FC<HomeProps> = () => {
    const [state, setState] = useState<HomeState>(defaultHomeState)
    const {connectWallet, disconnectWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}

export default Home