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
      <div className="grid md:grid-cols-3 gap-7">
        <div className="md:col-span-1 w-full">
          <div className="flex justify-between">
            <div className="py-3 border-b-[1px] border-zinc-200"><span className="text-3xl font-semibold uppercase">Janessa Food</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" 
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 cursor-pointer hover:text-zinc-500 md:hidden"
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul className={`${showMenu ? '' : 'hidden'}`}>
            <li className="cursor-pointer group" onClick={() => setSelect(0)}>
              <div className={`my-3 flex justify-end items-center 
              border-r-[4px] group-hover:text-blue-700 ${select === 0 ? 'text-blue-700 border-blue-700' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
            <li className="cursor-pointer group" onClick={() => setSelect(1)}>
              <div className={`my-3 flex justify-end items-center 
              border-r-[4px] group-hover:text-blue-700 ${select === 1 ? 'text-blue-700 border-blue-700' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 w-full">
          <div className="my-10">
            <div className="flex justify-center md:justify-end">
              <Link href='' className="text-xl px-2 py-1 border-2 border-red-400 rounded-full text-red-500 hover:text-white hover:bg-red-400 transition ease-in-out duration-200">Login</Link>
              <Link href='' className="text-xl px-2 py-1 border-2 border-red-400 rounded-full text-red-500 hover:text-white hover:bg-red-400 transition ease-in-out duration-200 ml-2">Logout</Link>
            </div>
            <div className="my-16">
              <div className="text-6xl font-semibold">Receipes</div>
              <div className="text-zinc-500">Janessa</div>
            </div>
            <div>
              <div className="font-semibold border-b-[1px] py-2">Latest receipes</div>
            </div>
            <div className="grid md:grid-cols-2 gap-7 my-3">
              <div className="card">
                <Image src={curry} alt="curry" className="w-full object-cover"></Image>
                <div className="m-5">
                  <div className="font-semibold">Veg noodles</div>
                  <div className="text-zinc-400 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-100 rounded-full px-3 py-1 absolute top-2 left-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={curry} alt="curry" className="w-full object-cover"></Image>
                <div className="m-5">
                  <div className="font-semibold">Veg noodles</div>
                  <div className="text-zinc-400 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-100 rounded-full px-3 py-1 absolute top-2 left-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={curry} alt="curry" className="w-full object-cover"></Image>
                <div className="m-5">
                  <div className="font-semibold">Veg noodles</div>
                  <div className="text-zinc-400 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-100 rounded-full px-3 py-1 absolute top-2 left-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={curry} alt="curry" className="w-full object-cover"></Image>
                <div className="m-5">
                  <div className="font-semibold">Veg noodles</div>
                  <div className="text-zinc-400 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-100 rounded-full px-3 py-1 absolute top-2 left-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card">
                <Image src={curry} alt="curry" className="w-full object-cover"></Image>
                <div className="m-5">
                  <div className="font-semibold">Veg noodles</div>
                  <div className="text-zinc-400 text-sm">Recipe by Mario</div>
                </div>
                <div className="flex bg-zinc-100 rounded-full px-3 py-1 absolute top-2 left-1">
                  <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
            </div>
            <div className="my-4">
              <span className="font-semibold">Most popluar</span>
            </div>
            <div className="flex justify-center items-center">
              <button className="px-3 py-2 text-xl bg-zinc-400 rounded-full hover:scale-125 transition ease-in-out duration-150">Load more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
