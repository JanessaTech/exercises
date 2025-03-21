'use client'

import { IWeb3Context, useWeb3Context } from "@/components/providers/Web3ContextProvider";
import { useRouter } from "next/navigation";

type LoginProps = {}
const Login:React.FC<LoginProps> = () => {
  const router = useRouter()
  const {connectWallet} = useWeb3Context() as IWeb3Context

  const onClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
    await connectWallet()
    router.push('/home')
  }
  return (
    <button className="bg-green-700 text-white px-3 py-2 rounded-full hover:bg-green-600" onClick={onClick}>Connect Metamask</button>
  );
}

export default Login
