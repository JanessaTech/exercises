'use client'
import { ConnectState, connectState } from "@/lib/Atoms";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function Home() {
  const router = useRouter()
  const [connect, setConnect] = useRecoilState<ConnectState>(connectState)

  const onClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
    if(window.ethereum) {
      console.log('Ethereum support is available')
      // setConnect({connected: true})
      // router.push('/home')
    } else {

    }
    
  }
  return (
    <button className="bg-green-700 text-white px-3 py-2 rounded-full hover:bg-green-600" onClick={onClick}>Connect Metamask</button>
  );
}
