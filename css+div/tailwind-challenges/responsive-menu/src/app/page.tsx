"use client"

import Link from "next/link";
import { useState } from "react";
import Image from 'next/image'
import stew from '../../public/img/stew.jpg'
import noodles from '../../public/img/noodles.jpg'
import curry from '../../public/img/curry.jpg'

export default function Home() {

  const [selected, setSelected] = useState<number>(0)
  const [isHidden, setHidden] = useState<boolean>(true)
  
  const handleSelect = (index: number) => {
    console.log('handleMenu:', index)
    setSelected(index)
  }

  const handleClick = () => {
    setHidden(!isHidden)
  }
  
  return (
    <div className="container">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 w-full">
          <div className="flex justify-between items-center">
            <div className="py-3 border-b-[1px] border-zinc-200"><span className="text-3xl font-semibold">Janessa Food</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" 
              onClick={handleClick}
              className="w-8 cursor-pointer hover:text-zinc-500 mr-1 md:hidden"
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul className={`${isHidden ? 'hidden' : ''}`}>
            <li className="my-2 group" onClick={() => handleSelect(0)}>
              <div className="flex justify-end border-r-[4px] border-white group-hover:border-blue-700 group-hover:text-blue-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="px-2">Home</span>
              </div>
            </li>
            <li className="my-2 group" onClick={() => handleSelect(1)}>
              <div className="flex justify-end border-r-[4px] border-white group-hover:border-blue-700 group-hover:text-blue-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="px-2">About</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 my-10">
          <div className="flex justify-center md:justify-end">
            <Link href='#' className="text-xl py-2 px-3 rounded-full border-2 border-red-400 hover:text-white hover:bg-red-500 transition ease-in-out duration-200">Login</Link>
            <Link href='#' className="text-xl py-2 px-3 rounded-full border-2 border-red-400 hover:text-white hover:bg-red-500 transition ease-in-out duration-200 ml-3">Logout</Link>
          </div>
          <div>
            <div className="text-6xl font-semibold">Recipes</div>
            <div className="text-gray-400 italic">Janessa</div>
          </div>
          <div>
            <div className="border-b-[2px] border-zinc-100 mt-10 mb-5 pb-3">
              <span className="font-semibold">Latest Recipes</span>
            </div>
            <div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="card">
                  <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                  <div className="my-2 mx-4">
                    <div className="font-semibold">Veg noodles</div>
                    <div className="text-sm text-zinc-400">Recipe by Mario</div>
                  </div>
                  <div className="flex items-center bg-zinc-300 px-2 py-1 rounded-full absolute top-3 left-2">
                    <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="font-semibold ml-1">25 mins</span>
                  </div>
                </div>
                <div className="card">
                  <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                  <div className="my-2 mx-4">
                    <div className="font-semibold">Veg noodles</div>
                    <div className="text-sm text-zinc-400">Recipe by Mario</div>
                  </div>
                  <div className="flex items-center bg-zinc-300 px-2 py-1 rounded-full absolute top-3 left-2">
                    <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="font-semibold ml-1">25 mins</span>
                  </div>
                </div>
                <div className="card">
                  <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                  <div className="my-2 mx-4">
                    <div className="font-semibold">Veg noodles</div>
                    <div className="text-sm text-zinc-400">Recipe by Mario</div>
                  </div>
                  <div className="flex items-center bg-zinc-300 px-2 py-1 rounded-full absolute top-3 left-2">
                    <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="font-semibold ml-1">25 mins</span>
                  </div>
                </div>
                <div className="card">
                  <Image src={noodles} alt="noodles" className="w-full object-cover"></Image>
                  <div className="my-2 mx-4">
                    <div className="font-semibold">Veg noodles</div>
                    <div className="text-sm text-zinc-400">Recipe by Mario</div>
                  </div>
                  <div className="flex items-center bg-zinc-300 px-2 py-1 rounded-full absolute top-3 left-2">
                    <svg className= 'w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="font-semibold ml-1">25 mins</span>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <span className="font-semibold">Most Popular</span>
              </div>
              <div className="flex justify-center">
                <button className="text-xl bg-slate-400 p-2 rounded-full hover:scale-125 transition ease-in-out duration-200">Load more</button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
