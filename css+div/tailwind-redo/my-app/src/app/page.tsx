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

  return (
    <div className="container">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <div className="flex justify-between items-center">
            <div className="py-3 border-b-[1px] border-zinc-300"><span className="text-3xl uppercase font-semibold">Janessa Food</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-8 cursor-pointer hover:text-zinc-400 md:hidden"
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul>
            <li className="cursor-pointer group" onClick={() => setSelected(0)}>
              <div className={`flex justify-end border-r-[4px] border-white 
              my-3 group-hover:text-blue-500 group-hover:border-blue-500 ${selected === 0 ? 'text-blue-500 border-blue-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-1">Home</span>
              </div>
            </li>
            <li className="cursor-pointer group" onClick={() => setSelected(1)}>
              <div className={`flex justify-end border-r-[4px] border-white 
              my-3 group-hover:text-blue-500 group-hover:border-blue-500 ${selected === 1 ? 'text-blue-500 border-blue-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-1">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="my-10">
            <div className="flex justify-center md:justify-end">
              <Link href='#' className="text-xl py-1 px-2 border-2 border-red-400 rounded-full text-red-400 hover:bg-red-300 hover:text-white transition ease-in-out duration-200">Login</Link>
              <Link href='#' className="text-xl py-1 px-2 border-2 border-red-400 rounded-full text-red-400 hover:bg-red-300 hover:text-white transition ease-in-out duration-200 ml-2">Logout</Link>
            </div>
            <div className="my-5">
              <div className="text-6xl">Receipes</div>
              <div className="text-zinc-400">Janessa</div>
            </div>
            <div className="mt-10 mb-3">
              <div className="font-semibold py-2 border-b-[1px] border-zinc-200">Latest recipes</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold">Delicious noodles</div>
                  <div className="text-sm text-zinc-400">By JanessaTech</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full px-2 py-1 absolute top-3 left-3">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold">Delicious noodles</div>
                  <div className="text-sm text-zinc-400">By JanessaTech</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full px-2 py-1 absolute top-3 left-3">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold">Delicious noodles</div>
                  <div className="text-sm text-zinc-400">By JanessaTech</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full px-2 py-1 absolute top-3 left-3">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                <div className="p-4">
                  <div className="font-semibold">Delicious noodles</div>
                  <div className="text-sm text-zinc-400">By JanessaTech</div>
                </div>
                <div className="flex bg-zinc-200 rounded-full px-2 py-1 absolute top-3 left-3">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center my-5"><button className="bg-zinc-400 text-xl px-2 py-1 rounded-full hover:scale-125 transition ease-in-out duration-150">Load more</button></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
