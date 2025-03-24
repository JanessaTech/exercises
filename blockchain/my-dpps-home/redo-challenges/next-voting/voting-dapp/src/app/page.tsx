'use client'

import { IWeb3Context, useWebContext } from "@/components/providers/Web3ContextProvider"
import { useRouter } from "next/navigation"

type LoginProps = {}
const Login: React.FC<LoginProps> = () => {
  const router = useRouter()
  const {connectWallet} = useWebContext() as IWeb3Context

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await connectWallet()
    router.push('/home')
  }
  
  return (
    <div>
      <button className="bg-zinc-600 rounded-3xl px-3 py-2" onClick={onClick}>Collect wallet</button>
    </div>
  )
}

export default Login