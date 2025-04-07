'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider"
import { AuthState, authState } from "@/lib/Atoms"
import { Contract } from "ethers"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

type HomeProps = {}
const Home: React.FC<HomeProps> = () => {
    const {connectWallet, disconnectWallet, state: {address, contract}} = useWeb3Context() as IWeb3Context
    const [auth, setAuth] = useRecoilState<AuthState>(authState)
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

    }
    return (
        <div>
            <div>address: {address}</div>
        </div>
    )
}

export default Home