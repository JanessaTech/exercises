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

import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useRouter } from "next/navigation"
import { abi, contractAddress } from "@/lib/ABI"
import { Contract, ethers } from 'ethers';
import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms"

type HomeProps = {}
const HomePage:React.FC<HomeProps> = () => {
    const router = useRouter()
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
    const {connectWallet, disConnectWallet, state} = useWeb3Context() as IWeb3Context

    useEffect(() => {
        (async () => {
            if(auth.connected) {
                updateState()
            } else {
                router.push('/')
            }
        })()
    }, [])

    const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
        setAuth({connected: false})
        router.push('/')
    }

    const test = async (e:React.MouseEvent<HTMLButtonElement>) => {
        console.log('test..')
        await connectWallet()
        //await disConnectWallet()
        
    }

    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const updateState = async () => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            console.log('enter here ...')
            const { ethereum } = window;
            const provider = new ethers.BrowserProvider(ethereum)
            await requestAccount()
            const signer = await provider.getSigner()
            const address = await signer.getAddress()
            console.log('address:', address)
            const contract = new Contract(contractAddress, abi, signer)
            const candidates = await contract.getCandidates()
            console.log('candidates:', candidates)
        }
    }


    return (
        <div className="w-full">
            <div className="ml-2 mb-2 flex justify-between items-center">
                <div>
                    <span>Status:</span><span className="font-semibold mx-1">In progressing</span>
                </div>
                <div><button className="bg-zinc-400 px-2 py-1 text-sm font-semibold rounded-full 
                hover:bg-zinc-500 hover:text-white" onClick={logout}>Logout</button></div>
            </div>
            <div>
            <div><button className="bg-zinc-400 px-2 py-1 text-sm font-semibold rounded-full 
                hover:bg-zinc-500 hover:text-white" onClick={test}>Test</button></div>
            </div>
            <div>
            <Table>
                <TableCaption>A list of candidates.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>VotedBy</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">0</TableCell>
                        <TableCell>Bob</TableCell>
                        <TableCell>1234566767</TableCell>
                        <TableCell className="text-right">
                            <button className="bg-green-700 hover:bg-green-600 text-white py-1 px-2 rounded-full">vote</button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>Alice</TableCell>
                        <TableCell>1234566767</TableCell>
                        <TableCell className="text-right">
                            <button className="bg-green-700 hover:bg-green-600 text-white py-1 px-2 rounded-full">vote</button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">2</TableCell>
                        <TableCell>Janessa</TableCell>
                        <TableCell>1234566767</TableCell>
                        <TableCell className="text-right">
                            <button className="bg-green-700 hover:bg-green-600 text-white py-1 px-2 rounded-full">vote</button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </div>
        </div>
    )
}

export default HomePage