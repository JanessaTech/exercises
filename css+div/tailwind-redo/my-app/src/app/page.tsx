"use client"

import { chownSync } from "fs";
import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import stew from '../../public/img/stew.jpg'
import noodles from '../../public/img/noodles.jpg'
import curry from '../../public/img/curry.jpg'

export default function Home() {
  const [select, setSelect] = useState<number>(0)
  const [showMenu, setShowMenu] = useState<boolean>(true)

  return (
    <div className="container">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-1 w-full">
          <div className="flex justify-between items-center">
            <div className="py-3"><span className="text-3xl font-semibold uppercase">Janessa Food</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" 
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 cursor-pointer hover:text-zinc-400 mx-1 md:hidden"
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul className={`${showMenu ? '' : 'hidden'}`}>
            <li className="group cursor-pointer my-2" onClick={() => setSelect(0)}>
              <div className={`flex justify-end border-r-[4px]  group-hover:text-blue-700 ${select === 0 ? 'border-blue-600 text-blue-700' :'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
            <li className="group cursor-pointer my-2" onClick={() => setSelect(1)}>
              <div className={`flex justify-end border-r-[4px]  group-hover:text-blue-700 ${select === 1 ? 'border-blue-600 text-blue-700' :'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 w-full">
          <div className="my-10 flex justify-center md:justify-end">
            <div><Link href='#' className="text-xl px-3 py-1 rounded-full border-[4px] border-red-300 hover:bg-red-400 hover:text-white transition ease-in-out duration-200">Login</Link></div>
            <div><Link href='#' className="text-xl px-3 py-1 rounded-full border-[4px] border-red-300 hover:bg-red-400 hover:text-white transition ease-in-out duration-200 mx-2">Logout</Link></div>
          </div>
          <div>
            <div className="text-6xl font-semibold">Receipes</div>
            <div className="text-zinc-600">By Janessa</div>
          </div>
          <div className="mt-10 mb-5"><div className="font-semibold border-b-[1px] border-zinc-100 py-2">Latest receipes</div></div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="card">
              <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
              <div className="p-4">
                <div className="font-semibold">My noodles</div>
                <div className="text-sm text-zinc-400">By Janessa</div>
              </div>
              <div className="flex bg-zinc-200 rounded-full absolute top-3 left-2 px-2 py-1">
                <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>25 mins</span>
              </div>
            </div>
            <div className="card">
              <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
              <div className="p-4">
                <div className="font-semibold">My noodles</div>
                <div className="text-sm text-zinc-400">By Janessa</div>
              </div>
              <div className="flex bg-zinc-200 rounded-full absolute top-3 left-2 px-2 py-1">
                <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>25 mins</span>
              </div>
            </div>
            <div className="card">
              <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
              <div className="p-4">
                <div className="font-semibold">My noodles</div>
                <div className="text-sm text-zinc-400">By Janessa</div>
              </div>
              <div className="flex bg-zinc-200 rounded-full absolute top-3 left-2 px-2 py-1">
                <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>25 mins</span>
              </div>
            </div>
            <div className="card">
              <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
              <div className="p-4">
                <div className="font-semibold">My noodles</div>
                <div className="text-sm text-zinc-400">By Janessa</div>
              </div>
              <div className="flex bg-zinc-200 rounded-full absolute top-3 left-2 px-2 py-1">
                <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>25 mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
