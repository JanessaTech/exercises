'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useRouter } from "next/navigation"
import { ethers } from 'ethers';
import { AuthState, authState } from "@/lib/Atoms"
import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { Contract } from "ethers"

type HomeProps = {}
type CandidateType = {
    id: number;
    name: string;
    votedBy: string
}
type HomeStateType = {
    isEnded: boolean;
    candidates: CandidateType[]
}

const defaultHomeState = {
    isEnded: false,
    candidates: []
}

const HomePage:React.FC<HomeProps> = () => {
    const router = useRouter()
    const [auth] = useRecoilState<AuthState>(authState)
    const {connectWallet, disConnectWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    const [state, setState] = useState<HomeStateType>(defaultHomeState)

    useEffect(() => {
        (async () => {
            if(auth.connected) {
                if (contract) {
                    await updateState(contract)  
                } else { // in case we refresh the home page when we are logined
                    await connectWallet()
                }   
            } else {
                router.push('/')
            }
        })()
    }, [contract])

    const logout = async (e:React.MouseEvent<HTMLButtonElement>) => {
        await disConnectWallet()
        router.push('/')
    }

    const updateState = async (contract: Contract) => {
        const rawCandiates: {[P in any]: any}[]= await contract.getCandidates()
        const rows:CandidateType[] = []
        rawCandiates.forEach((e) => rows.push({id: Number(e[0]), name: e[1], votedBy: e[2] === ethers.ZeroAddress ? '' : e[2]}))
        const isEnded = await contract.isEnded()
        setState({...state, isEnded: isEnded, candidates: rows}) 
    }

    return (
        <div className="w-full">
            <div className="ml-2 mb-2">
                <div className="flex justify-between">
                    <div>
                        <span>Status:</span><span className="font-semibold mx-1">In progressing</span>
                    </div>
                    <div>
                        <button className="bg-zinc-400 px-2 py-1 text-sm font-semibold rounded-full 
                        hover:bg-zinc-500 hover:text-white" onClick={logout}>Logout</button>
                    </div>   
                </div>
                <div><span className="font-semibold uppercase">address:</span> <span className="text-sm">{address}</span></div> 
            </div>
            
            <div>
            <Table>
                <TableCaption>A list of candidates</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>VotedBy</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        state.candidates.map((candidate) => {
                            return (
                                <TableRow key={candidate.id}>
                                    <TableCell className="font-medium">{candidate.id}</TableCell>
                                    <TableCell>{candidate.name}</TableCell>
                                    <TableCell>{candidate.votedBy}</TableCell>
                                    <TableCell className="text-right">
                                        <button className={`hover:bg-green-60 disabled:hover:bg-zinc-400 
                                                        text-white py-1 px-2 rounded-full ${candidate.votedBy ? 'bg-zinc-500' : 'bg-green-700'}`} 
                                                disabled={!!candidate.votedBy}>vote</button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            </div>
        </div>
    )
}

export default HomePage