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
          <div className="flex md:justify-end justify-between items-center">
            <div className="py-3 border-b-[1px] border-gray-100">
              <span className="text-3xl font-bold">Janessa Food</span>
            </div>
            <div className="md:hidden" onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
              className="w-6 hover:text-gray-600 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
          </div>
          <ul className={`${showMenu ? '': 'hidden'} mt-3`}>
            <li className="cursor-pointer" onClick={() => handleMenu(0)}>
              <div className={`flex justify-end border-r-[4px]  hover:text-sky-600 ${selected === 0 ? 'text-sky-600 border-sky-600' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6 mx-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-1">Home</span>
              </div>
            </li>
            <li className="cursor-pointer" onClick={() => handleMenu(1)}>
              <div className={`flex justify-end border-r-[4px]  hover:text-sky-600 ${selected === 1 ? 'text-sky-600 border-sky-600' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6 mx-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-1">About</span>
              </div>
            </li>
          </ul>
          
        </div>
        <div className="md:col-span-2 m-10">
          <div className="flex md:justify-end justify-center">
            <Link href="#" className="px-3 py-1 border-[2px] text-red-400 border-red-400 rounded-full hover:text-white hover:bg-red-500 transition ease-in-out duration-300 mx-1">Login</Link>
            <Link href="#" className="px-3 py-1 border-[2px] text-red-400 border-red-400 rounded-full hover:text-white hover:bg-red-500 transition ease-in-out duration-300">Logout</Link>
          </div>
          <div>
            <span className="font-semibold text-3xl block">My recipes</span>
            <span className="text-gray-400">For Janessa</span>
          </div>
          <div className="py-3 mt-10border-b-[1px] border-gray-100">
            <span className="font-semibold">Latest recipes</span>
          </div>
          <div className="grid md:grid-cols-3 py-3 gap-3">
            <div className="rounded-md shadow-md hover:shadow-xl overflow-hidden">
              <img src="/img/stew.jpg" alt="stew" className="w-full object-over"/>
              <div className="p-3">
                <span className="font-bold block">5 Bean Chilli Stew</span>
                <span className="text-gray-400 text-sm">Recipe by Mario</span>
              </div>
            </div>
            <div className="rounded-md shadow-md hover:shadow-xl overflow-hidden">
              <img src="/img/stew.jpg" alt="stew" className="w-full object-over"/>
              <div className="p-3">
                <span className="font-bold block">5 Bean Chilli Stew</span>
                <span className="text-gray-400 text-sm">Recipe by Mario</span>
              </div>
            </div>
            <div className="rounded-md shadow-md hover:shadow-xl overflow-hidden">
              <img src="/img/stew.jpg" alt="stew" className="w-full object-over"/>
              <div className="p-3">
                <span className="font-bold block">5 Bean Chilli Stew</span>
                <span className="text-gray-400 text-sm">Recipe by Mario</span>
              </div>
            </div>
            <div className="rounded-md shadow-md hover:shadow-xl overflow-hidden">
              <img src="/img/stew.jpg" alt="stew" className="w-full object-over"/>
              <div className="p-3">
                <span className="font-bold block">5 Bean Chilli Stew</span>
                <span className="text-gray-400 text-sm">Recipe by Mario</span>
              </div>
            </div>
            
          </div>
          <div className="my-4">
              <span className="font-bold">Most poplular</span>
          </div>
          <div className="flex justify-center">
            <button className="px-3 py-2 rounded-full bg-gray-400 hover:bg-gray-500">Load more</button>
          </div>
        </div>
      </div>
    </div>
  );
}
