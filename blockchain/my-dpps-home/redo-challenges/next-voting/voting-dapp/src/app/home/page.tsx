'use client'

import { Iweb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider";
import { AuthState, authState } from "@/lib/Atoms";
import { ethers } from "ethers";
import { AwardIcon } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

type CandidateType = {
    id: number;
    name: string; 
    votedBy: string
}
type HomeState = {
    isEnded: boolean;
    candidates: CandidateType[]
}

const defaultHomeState: HomeState = {
    isEnded: false,
    candidates: []
}

type HomeProps = {}
const Home: React.FC<HomeProps> = () => {
    const router = useRouter()
    const [state, setState] = useState<HomeState>(defaultHomeState)
    const {connectWallet, disconnectWallet, state: {contract, address}} = useWeb3Context() as Iweb3Context
    const [auth, setAuth] = useRecoilState<AuthState>(authState)

    useEffect(() => {
        (async () => {
            if (auth.connected) {
                if (contract) {
                    await updateState(contract)
                } else {
                    await connectWallet()
                }
            } else {
                router.push('/')
            }
        })()
    }, [contract])

    const updateState = async (contract: ethers.Contract) => {
        const rawCandiates: {[P in any]: any}[] = await contract.getCandidates()
        const rows: CandidateType[] = []
        rawCandiates.forEach((e) => {
            rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]})
        })
        const isEnded = await contract.isEnded()
        setState({isEnded: isEnded, candidates: rows})
    }

    console.log(state)

    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}

export default Home