"use client"

import { chownSync } from "fs";
import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import stew from '../../public/img/stew.jpg'
import noodles from '../../public/img/noodles.jpg'
import curry from '../../public/img/curry.jpg'

export default function Home() {
  const [selected, setSelected] = useState<number>(0)
  const [showMenu, setShowMenu] = useState<boolean>(true)

  return (
    <div className="container">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <div className="flex justify-between items-center">
            <div className="py-4"><span className="text-3xl font-semibold uppercase">Janessa Food</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-8 cursor-pointer hover:text-zinc-500 md:hidden"
              onClick={() => setShowMenu(!showMenu)}
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul className={`${showMenu ? '' : 'hidden'}`}>
            <li className="group my-3" onClick={() => setSelected(0)}>
              <div className={`flex justify-end border-r-[4px]  
                  cursor-pointer group-hover:border-blue-700  
                  group-hover:text-blue-700 ${selected === 0 ? 'text-blue-700 border-blue-700' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
            <li className="group" onClick={() => setSelected(1)}>
              <div className={`flex justify-end border-r-[4px]  
                  cursor-pointer group-hover:border-blue-700  
                  group-hover:text-blue-700 ${selected === 1 ? 'text-blue-700 border-blue-700' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="py-5">
            <div className="flex justify-center md:justify-end">
              <Link href='#' className="text-xl px-2 py-1 border-red-400 text-red-500 border-2 
              rounded-full hover:text-white hover:bg-red-300 transition ease-in-out duration-200">Login</Link>
              <Link href='#' className="text-xl px-2 py-1 border-red-400 text-red-500 border-2 
              rounded-full hover:text-white hover:bg-red-300 transition ease-in-out duration-200 ml-3">Logout</Link>
            </div>
            <div>
              <div className="text-6xl font-semibold">Reciepes</div>
              <div className="text-sm text-zinc-500">Janessa</div>
            </div>
            <div className="border-b-[1px] border-zinc-200 mt-5 mb-3 py-3">
              <span className="font-semibold">Latest receipe</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold text-lg">Veg noodles</div>
                  <div className="text-zinc-300 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full absolute top-2 left-3 px-2 py-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>

              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold text-lg">Veg noodles</div>
                  <div className="text-zinc-300 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full absolute top-2 left-3 px-2 py-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>

              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold text-lg">Veg noodles</div>
                  <div className="text-zinc-300 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full absolute top-2 left-3 px-2 py-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold text-lg">Veg noodles</div>
                  <div className="text-zinc-300 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full absolute top-2 left-3 px-2 py-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="px-1">25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold text-lg">Veg noodles</div>
                  <div className="text-zinc-300 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full absolute top-2 left-3 px-2 py-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
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
