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
type HomeStateType ={
    isEnded: boolean;
    candiates: CandidateType[]
}

const defaultHomeState: HomeStateType = {
    isEnded: false,
    candiates: []
}

type HomeProps = {}
const Home: React.FC<HomeProps> = () => {
    const {connectWallet, disconnetWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    const [auth] = useRecoilState<AuthState>(authState)
    const router = useRouter()
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
        const rawCandiates: {[P in any]: any}[] = await contract.getCandidates()
        const rows: CandidateType[] = []
        rawCandiates.forEach((element) => {
            rows.push({id: Number(element[0]), name: element[1], votedBy: element[2]})
        });
        const isEnded = await contract.isEnded()
        setState({isEnded: isEnded, candiates: rows})
    }

    console.log(state)

    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}

export default Home