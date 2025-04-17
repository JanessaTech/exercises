'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type HomeState = {
    isEnded: boolean;
    candidates: CandidateType[]
}

type CandidateType = {
    id: number;
    name: string,
    votedBy: string
}

const defaultHomeState: HomeState = {
    isEnded: false,
    candidates: []
}
type HomeProps = {}
const Home: React.FC<HomeProps> = () => {
    const {collectWallet, disconnectWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    const [state, setState] = useState<HomeState>(defaultHomeState)
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (auth.connected) {
                if (contract) {
                    await updateState(contract)
                } else {
                    await collectWallet()
                }
            } else {
                router.push('/')
            }
        })()
    }, [contract])

    const updateState = async (contract: ethers.Contract) => {
        const rawCandidates: {[P in any]: any}[] = await contract.getCandidates()
        const rows:CandidateType[] = []
        rawCandidates.forEach((e) => 
        rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]}))
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