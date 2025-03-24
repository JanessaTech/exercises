'use client'

import { IWeb3Context, useWebContext } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms"
import { Contract } from "ethers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

type HomeProps = {}
type CandidateType = {
    id: number;
    name: string;
    votedBy: string
}
type HomeStateType ={
    isEnded: boolean;
    candidates: CandidateType[]
}
const defaultHomeState: HomeStateType = {
    isEnded: false,
    candidates: []
}

const Home: React.FC<HomeProps> = () => {
    const [auth] = useRecoilState<AuthState>(authState)
    const router = useRouter()
    const {connectWallet, disConnectWallet, state: {address, contract}} = useWebContext() as IWeb3Context
    const [state, setState] = useState<HomeStateType>(defaultHomeState)

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

    const updateState = async (contract: Contract) => {
        const rawCandidates: {[P in any]: any}[] = await contract.getCandidates()
        const rows: CandidateType[] = []
        rawCandidates.forEach((e) => {
            rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]})
        })
        const isEnded = await contract.isEnded()
        setState({...state, isEnded: isEnded, candidates: rows})
        
    }

    console.log(state)

    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}
export default Home