'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { authState } from "@/lib/Atoms"
import { useRouter } from "next/navigation"
import React from "react"
import { useRecoilState } from "recoil"

type LoginProps = {}
const Login: React.FC<LoginProps> = () => {
    const [auth, setAuth] = useRecoilState(authState)
    const router = useRouter()
    const {connectWallet} = useWeb3Context() as IWeb3Context

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await connectWallet()
        router.push('/home')
    }

    return (
        <div>
            <button className="bg-zinc-600 rounded-3xl px-3 py-2" onClick={onClick}>Collect wallet </button>
        </div>
    )
}

export default Login