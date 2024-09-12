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
              <span className="text-xl font-semibold uppercase px-2">Janessa food</span>
            </div>
            <div className="md:hidden cursor-pointer hover:text-zinc-600" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
          </div>
          <ul className={`${showMenu ? '' : 'hidden'}`}>
            <li className="cursor-pointer" onClick={() => handleMenu(0)}>
              <div className={`flex justify-end items-center border-r-4 border-red-600 my-2 ${selected === 0 ? 'border-red-600' : 'border-white'}`}>
                <span className={`${selected === 0 ? 'font-semibold text-red-600' : 'text-inherit'}`}>Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className={`w-6 mx-2 ${selected === 0 ? 'text-red-600' : ''}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
            </li>
            <li className="cursor-pointer" onClick={() => handleMenu(1)}>
              <div className={`flex justify-end items-center border-r-4 border-red-600 my-2 ${selected === 1 ? 'border-red-600' : 'border-white'}`}>
                <span className={`${selected === 1 ? 'font-semibold text-red-600' : 'text-inherit'}`}>Question</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className={`w-6 mx-2 ${selected === 1 ? 'text-red-600' : ''}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 h-20 bg-green-300">
        </div>
      </div>

    </div>
  );
}
