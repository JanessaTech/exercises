'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms"
import { Contract } from "ethers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

type CandidateType = {
    id: number;
    name: string;
    votedBy: string
}
type HomeStateType = {
    isEnded: boolean,
    candidates: CandidateType[]
}
const defaultHomeState: HomeStateType = {
    isEnded: false,
    candidates: []
}

type HomeProps = {}
const Home:React.FC<HomeProps> = () =>{
    const {connectWallet, disconnectWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
    const [state, setState] = useState<HomeStateType>(defaultHomeState)
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

    const updateState = async (contract: Contract) => {
        const rawCandidates: {[P in any]: any}[] = await contract.getCandidates()
        const rows: CandidateType[] = []
        rawCandidates.forEach((e) => {
            rows.push({id: Number(e[0]), name: e[1], votedBy: e[2]})
        })
        const isEnded =await contract.isEnded()
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