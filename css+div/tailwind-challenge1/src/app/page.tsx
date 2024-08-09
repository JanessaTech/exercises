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
          <div className="flex justify-between">
            <div className="text-2xl font-semibold py-3 border-b-[1px] border-zinc-200">Janessa food</div>
            <svg 
              onClick={handleClick}
              className="w-6 text-zinc-500 hover:text-zinc-700 cursor-pointer md:hidden mr-4"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <div>
            <ul className={`${showMenu ? '' : 'hidden'}`}>
              <li className="flex justify-end my-3 border-r-4 hover:border-red-600 border-white cursor-pointer hover:text-sky-500">
                <span>Home</span>
                <svg 
                  className="w-6 mx-3"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </li>
              <li className="flex justify-end my-3 border-r-4 hover:border-red-600 border-white cursor-pointer hover:text-sky-500">
                <span>Home</span>
                <svg 
                  className="w-6 mx-3"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </li>
              <li className="flex justify-end my-3 border-r-4 hover:border-red-600 border-white cursor-pointer hover:text-sky-500">
                <span>Home</span>
                <svg 
                  className="w-6 mx-3"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="my-8 flex md:justify-end justify-center">
            <Link href={''} className="border-4 border-red-300 px-4 py-2 rounded-full hover:bg-red-200 hover:text-white mx-2">Login</Link>
            <Link href={''} className="border-4 border-red-300 px-4 py-2 rounded-full hover:bg-red-200 hover:text-white">Logout</Link>
          </div>
          <div>
            <div className="text-6xl font-bold">Recipes</div>
            <div className="text-zinc-400">For Janessa</div>
          </div>
          <div className="font-bold py-3 border-b-[1px] border-zinc-200">Latest recips</div>
          <div className="grid md:grid-cols-3 my-4 gap-3">
            <div className="rounded-md shadow-md cursor-pointer hover:shadow-lg overflow-hidden relative">
              <img src="/img/stew.jpg" alt="stew" className="w-full md:h-40 h-75 object-cover"/>
              <div className="flex flex-col m-4">
                <span className="text-xl font-bold">Jnaessa jia</span>
                <span className="text-zinc-400 text-sm">By lulu</span>
              </div>
              <div className="rounded-full py-2 px-3 bg-zinc-500 w-fit text-white absolute top-1 left-1">25 mins</div>
            </div>
            <div className="rounded-md shadow-md cursor-pointer hover:shadow-lg overflow-hidden relative">
              <img src="/img/stew.jpg" alt="stew" className="w-full md:h-40 h-75 object-cover"/>
              <div className="flex flex-col m-4">
                <span className="text-xl font-bold">Jnaessa jia</span>
                <span className="text-zinc-400 text-sm">By lulu</span>
              </div>
              <div className="rounded-full py-2 px-3 bg-zinc-500 w-fit text-white absolute top-1 left-1">25 mins</div>
            </div>
            <div className="rounded-md shadow-md cursor-pointer hover:shadow-lg overflow-hidden relative">
              <img src="/img/stew.jpg" alt="stew" className="w-full md:h-40 h-75 object-cover"/>
              <div className="flex flex-col m-4">
                <span className="text-xl font-bold">Jnaessa jia</span>
                <span className="text-zinc-400 text-sm">By lulu</span>
              </div>
              <div className="rounded-full py-2 px-3 bg-zinc-500 w-fit text-white absolute top-1 left-1">25 mins</div>
            </div>
            <div className="rounded-md shadow-md cursor-pointer hover:shadow-lg overflow-hidden relative">
              <img src="/img/stew.jpg" alt="stew" className="w-full h-40 object-cover"/>
              <div className="flex flex-col m-4">
                <span className="text-xl font-bold">Jnaessa jia</span>
                <span className="text-zinc-400 text-sm">By lulu</span>
              </div>
              <div className="rounded-full py-2 px-3 bg-zinc-500 w-fit text-white absolute top-1 left-1">25 mins</div>
            </div>
          </div>
          <div>
            <div className="font-bold">Popular recipe</div>
            <button className="bg-zinc-500 hover:bg-zinc-600 py-2 px-4 rounded-full mx-auto block">Load more</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
