'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
type Candidate = {
    id : number;
    name: string;
    votedBy: string
}
type HomeState = {
    isEnded: boolean;
    candidates: Candidate[]
}
const defaultHomeState: HomeState = {
    isEnded: false,
    candidates: []
}

type HomeProps = {}
const Home: React.FC<HomeProps> = () => {
    const {connectWallet, disconnectwallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
    const router = useRouter()
    const [state, setState] = useState<HomeState>(defaultHomeState)

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
        const rawCandiates:any[] = await contract.getCandidates()
        const rows: Candidate[] = []
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