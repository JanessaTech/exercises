"use client"

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState<boolean>(true)
  const [selected, setSelected] = useState<number>(0)

  const handleClick = () =>{
    setShowMenu(pre => !pre)
  }

  const handleMenu = (index: number) => {
    setSelected(index)
  }
  
  return (
    <div className="container">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex justify-between items-center">
              <div className="py-4 border-b-[1px] border-zinc-300 w-fit">
                <Link href='#' className="text-2xl font-semibold">Janessa Food</Link>
              </div>
              <div className="md:hidden">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" 
                  stroke-width="1.5" stroke="currentColor" 
                  className="w-6 cursor-pointer hover:text-zinc-600" onClick={handleClick}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
          </div>
          <ul className={`my-2 ${showMenu ? '' : 'hidden'}`}>
            <li className="py-2 group" onClick={() => setSelected(0)}>
              <Link href="#" 
                className={`flex justify-end border-r-4 hover:border-sky-600  ${selected === 0 ? 'border-sky-600' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                  className={`w-6 group-hover: ${selected === 0 ? 'text-sky-600' : 'text-zinc-600'} `}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className={`mx-2 group-hover:text-sky-600 font-semibold  ${selected === 0 ? 'text-sky-600' : 'text-zinc-600'}`}>Home</span>
              </Link>
            </li>
            <li className="py-2 group" onClick={() => setSelected(1)}>
              <Link href="#" 
                className={`flex justify-end border-r-4 hover:border-sky-600  ${selected === 1 ? 'border-sky-600' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className={`w-6 group-hover: ${selected === 1 ? 'text-sky-600' : 'text-zinc-600'} `}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                <span className={`mx-2 group-hover:text-sky-600 font-semibold  ${selected === 1 ? 'text-sky-600' : 'text-zinc-600'}`}>About</span>
              </Link>
            </li>
          </ul>
            
        </div>
        <div className="md:col-span-2 h-96 bg-lime-200"></div>

      </div>

    </div>
  );
}
