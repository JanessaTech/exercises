'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ConextProvider"
import { AuthState, authState } from "@/lib/Atoms"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
type Candidate = {
    id: number;
    name: string,
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
    const [state, setState] = useState<HomeState>(defaultHomeState)
    const [auth, setAuth]  = useRecoilState<AuthState>(authState)
    const {connectWallet, disconnectWallet, state: {contract, address}} = useWeb3Context() as IWeb3Context
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
        const rows: Candidate[] = []
        rawCandidates.forEach((e) => {
            rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]} )
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