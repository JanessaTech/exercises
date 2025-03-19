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
import { connectState, type ConnectState } from "@/lib/Atoms"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useRouter } from "next/navigation"

type HomeProps = {}
const HomePage:React.FC<HomeProps> = () => {
    const router = useRouter()
    const [connect, setConnect] = useRecoilState<ConnectState>(connectState)

    useEffect(() => {
        if(connect.connected) {

        } else {
            router.push('/')
        }
    }, [])

    const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
        setConnect({connected: false})
        router.push('/')
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