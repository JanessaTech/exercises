"use client"

import { chownSync } from "fs";
import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import stew from '../../public/img/stew.jpg'
import noodles from '../../public/img/noodles.jpg'
import curry from '../../public/img/curry.jpg'
import { tree } from "next/dist/build/templates/app-page";
import { ShipWheel } from "lucide-react";

export default function Home() {
 const [select, setSelect] = useState<number>(0)
 const [showMenu, setShowMenu] = useState<boolean>(true)

  return (
    <div className="container">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <div>
            <div className="flex justify-between items-center">
              <div className="py-4 border-b-[1px] border-zinc-300">
                <span className="text-3xl uppercase font-semibold">Janessa Foods</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" 
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer size-7 hover:text-zinc-600 active:text-zinc-500 md:hidden"
                fill="none"
                viewBox="0 0 24 24" 
                strokeWidth="1.5"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            <ul className={`${showMenu ? '' : 'hidden'}`}>
              <li className="cursor-pointer group py-3" onClick={() => setSelect(0)}>
                <div className={`flex justify-end  items-center border-r-[4px]  
                            group-hover:border-red-500 group-hover:text-red-500 ${select === 0 ? 'text-red-500 border-red-500' : 'border-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="px-2">Home</span>
                </div>
              </li>
              <li className="cursor-pointer group py-3" onClick={() => setSelect(1)}>
                <div className={`flex justify-end  items-center border-r-[4px]  
                            group-hover:border-red-500 group-hover:text-red-500 ${select === 1 ? 'text-red-500 border-red-500' : 'border-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="px-2">About</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="my-10">
            <div className="flex justify-center md:justify-end">
              <Link href="#" className="bg-pink-500 py-1 px-2 rounded-full text-xl text-white border-[2px] border-pink-300 hover:bg-white hover:text-pink-500 transition duration-200 ease-in-out">Login</Link>
              <Link href="#" className="bg-pink-500 py-1 px-2 rounded-full text-xl text-white border-[2px] border-pink-300 hover:bg-white hover:text-pink-500 transition duration-200 ease-in-out">Logout</Link>
            </div>
            <div className="my-12">
              <div className="text-6xl">Receipes</div>
              <div className="text-zinc-500 italic">Janessa</div>
            </div>
            <div className="border-b-[1px] border-zinc-200 py-2">
              <div className="font-semibold">Latest receipes</div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="card">
                <Image src={noodles} alt='noodles' className="w-full object-cover"></Image>
                <div className="p-2">
                  <div className="font-semibold">Delicous fodds</div>
                  <div className="text-xs text-zinc-400">By Janessa</div>
                </div>
                <div className="left-1 top-2 absolute">
                  <div className="flex bg-zinc-100 rounded-full w-fit px-2 py-1">
                    <svg className= 'size-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="px-1">25 mins</span>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt='noodles' className="w-full object-cover"></Image>
                <div className="p-2">
                  <div className="font-semibold">Delicous fodds</div>
                  <div className="text-xs text-zinc-400">By Janessa</div>
                </div>
                <div className="left-1 top-2 absolute">
                  <div className="flex bg-zinc-100 rounded-full w-fit px-2 py-1">
                    <svg className= 'size-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="px-1">25 mins</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <Image src={noodles} alt='noodles' className="w-full object-cover"></Image>
                <div className="p-2">
                  <div className="font-semibold">Delicous fodds</div>
                  <div className="text-xs text-zinc-400">By Janessa</div>
                </div>
                <div className="left-1 top-2 absolute">
                  <div className="flex bg-zinc-100 rounded-full w-fit px-2 py-1">
                    <svg className= 'size-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="px-1">25 mins</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <Image src={noodles} alt='noodles' className="w-full object-cover"></Image>
                <div className="p-2">
                  <div className="font-semibold">Delicous fodds</div>
                  <div className="text-xs text-zinc-400">By Janessa</div>
                </div>
                <div className="left-1 top-2 absolute">
                  <div className="flex bg-zinc-100 rounded-full w-fit px-2 py-1">
                    <svg className= 'size-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="px-1">25 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
