'use client'

import { useState } from "react";
export default function Home() {
  const [isMin, setIsMin]= useState(false)
  const [animation, setAnimation] = useState<string>('')
  const handleClick = () => {
    if (isMin) {
      setAnimation('animate-move-right') 
    } else {
      setAnimation('animate-move-left')
    }
    setIsMin(isMin => !isMin)
  }
  return (
    <div className="flex">
      <div className={`w-[300px] bg-pink-500 h-screen cursor-pointer ${animation}`} onClick={handleClick}>
      </div>
      <div className="grow bg-zinc-300"></div>
    </div>
  );
}
