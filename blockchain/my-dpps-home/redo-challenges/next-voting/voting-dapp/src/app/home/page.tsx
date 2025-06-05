'use client'

import { IWebContext, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms";
import { ethers } from "ethers";
import { addRequestMeta } from "next/dist/server/request-meta";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
type CandidateType = {
    id: Number;
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
    const {connectWallet, disconnectWallet, state: {address, contract}} = useWeb3Context() as IWebContext
    const [state, setState] = useState<HomeState>(defaultHomeState)
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
    const router = useRouter()

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
        const rawCandidates: any[] = await contract.getCandidates()
        const rows: CandidateType[] = []
        rawCandidates.forEach((e) => {
            rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]})
        })
        const isEnded = await contract.isEnded()
        setState({candidates: rows, isEnded: isEnded})
    }

    console.log(state)

    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}
export default Home