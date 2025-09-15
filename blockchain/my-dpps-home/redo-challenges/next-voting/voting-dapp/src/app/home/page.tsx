'use client'
import { Iweb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
type Candidate = {
    id: number;
    name: string;
    votedBy: string
}
type HomeStateType = {
    isEnded: boolean;
    candidates: Candidate[]
}
const defaultHomeState: HomeStateType = {
    isEnded: false,
    candidates: []
}
const Home = () => {
    const [state, setState] = useState<HomeStateType>(defaultHomeState)
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
    const {connectWallet, disconnectWallet, state:{address, contract}} = useWeb3Context() as Iweb3Context
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
        const rawCandiates: any[] = await contract.getCandidates()
        const rows: Candidate[] = []
        rawCandiates.forEach((e => {
            rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]})
        }))
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