'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    router.push('/home')
  }
  return (
    <button className="bg-green-700 text-white px-3 py-2 rounded-full hover:bg-green-600" onClick={onClick}>Connect Metamask</button>
  );
}
