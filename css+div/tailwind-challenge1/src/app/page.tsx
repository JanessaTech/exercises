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
    console.log('handleMenu', index)
    setSelected(index)
  }
  
  return (
    <div className="container">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex justify-between md:justify-end items-center">
            <div className="py-3 border-b-[1px] border-zinc-200">
              <span className="text-2xl uppercase font-semibold px-3">Janessa food</span>
            </div>
            <div className="md:hidden" onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
              className="w-6 cursor-pointer hover:text-zinc-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
          </div>
          <ul className={`${showMenu ? '' : 'hidden'}`}>
            <li className={`my-2 cursor-pointer ${selected === 0 ? 'text-red-600' : ''}`} onClick={() => handleMenu(0)}>
              <div className={`flex justify-end items-center border-r-[4px] hover:border-red-500 ${selected === 0 ? 'border-red-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
            <li className={`my-2 cursor-pointer ${selected === 1 ? 'text-red-600' : ''}`} onClick={() => handleMenu(1)}>
              <div className={`flex justify-end items-center border-r-[4px] hover:border-red-500 ${selected === 1 ? 'border-red-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 bg-green-100">
          ddd
        </div>
      </div>

    </div>
  );
}
