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
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <div className="flex justify-between">
            <div className="py-3 border-b-[1px] border-zinc-300"><span className="text-2xl font-semibold uppercase">Janessa Food</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" 
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 hover:text-zinc-500 cursor-pointer active:text-zinc-600 md:hidden"
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul className={`${showMenu ? '' : 'hidden'}`}>
            <li className="group py-3 cursor-pointer" onClick={() => setSelect(0)}>
              <div className={`flex justify-end items-center border-r-[4px] group-hover:border-red-600 group-hover:text-red-600
                              ${select === 0 ? 'border-red-600 text-red-600' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="px-2">Home</span>
              </div>
            </li>
            <li className="group py-3 cursor-pointer" onClick={() => setSelect(1)}>
              <div className={`flex justify-end items-center border-r-[4px] group-hover:border-red-600 group-hover:text-red-600
                              ${select === 1 ? 'border-red-600 text-red-600' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="px-2">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="my-10">
            <div className="flex justify-center md:justify-end">
              <Link href="#" className="px-2 py-1 border-[2px] border-red-400 rounded-full text-red-500 hover:bg-red-300 hover:text-white transition duration-150 ease-in-out">Login</Link>
              <Link href="#" className="px-2 py-1 border-[2px] border-red-400 rounded-full text-red-500 hover:bg-red-300 hover:text-white transition duration-150 ease-in-out ml-3">Logout</Link>
            </div>
            <div className="my-20">
              <div className="text-6xl font-semibold">Recipes</div>
              <div className="text-zinc-500 italic">Janessa</div>
            </div>
            <div className="border-b-[1px] border-zinc-200 pb-2">
              <span className="font-semibold">Latest recipes</span>
            </div>
            <div className="grid md:grid-cols-3 gap-5 my-5">
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-3">
                  <div className="font-semibold">Good noodles</div>
                  <div className="text-xs text-zinc-500">By Janessa</div>
                </div>
                <div className="flex items-center bg-zinc-100 rounded-full absolute top-2 left-1 px-2 py-1">
                  <svg className= 'w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
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
  )
}
