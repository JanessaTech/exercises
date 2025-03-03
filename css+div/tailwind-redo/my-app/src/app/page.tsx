"use client"

import { chownSync } from "fs";
import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import stew from '../../public/img/stew.jpg'
import noodles from '../../public/img/noodles.jpg'
import curry from '../../public/img/curry.jpg'

export default function Home() {
  const [showMenu, setShowMenu] = useState<boolean>(true)
  const [selected, setSelected] = useState<number>(0)

  const handleMenu = (index: number) => {
    console.log('handleMenu', index)
    setSelected(index)
  }

  return (
    <div className="container">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex justify-between items-center">
            <div className="py-3 border-b-[1px] border-zinc-200">
              <span className="text-2xl uppercase font-semibold px-3">Janssa Food</span>
            </div>
            <div className="px-1 md:hidden" onClick={() => setShowMenu(!showMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                  className="w-6 cursor-pointer hover:text-zinc-600">
                    <path stroke-linecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
            </div>
          </div>
          <ul className={`${showMenu ? 'block': 'hidden'}`}>
            <li className={`my-2 cursor-pointer hover:text-lime-600 ${selected === 0 ? 'text-red-500' : ''}`} onClick={() => handleMenu(0)}>
              <div className={`flex justify-end items-center border-r-[4px]  hover:border-red-500 ${selected === 0 ? 'border-red-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6">
                  <path stroke-linecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
            <li className={`my-2 cursor-pointer hover:text-lime-600 ${selected === 1 ? 'text-red-500' : ''}`} onClick={() => handleMenu(1)}>
              <div className={`flex justify-end items-center border-r-[4px]  ${selected === 1 ? 'border-red-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6">
                  <path stroke-linecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
            <li className={`my-2 cursor-pointer hover:text-lime-600 ${selected === 2 ? 'text-red-500' : ''}`} onClick={() => handleMenu(2)}>
              <div className={`flex justify-end items-center border-r-[4px]  ${selected === 2 ? 'border-red-500' : 'border-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-6">
                  <path stroke-linecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mx-2">Home</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 px-16 py-6">
          <div className="flex md:justify-end justify-center">
            <Link href='#' className="ml-2 border-2 border-red-300 text-red-600 px-3 py-2 rounded-full hover:bg-red-400 hover:text-white transition ease-in-out duration-500">Login</Link>
            <Link href='#' className="ml-2 border-2 border-red-300 text-red-600 px-3 py-2 rounded-full hover:bg-red-400 hover:text-white transition ease-in-out duration-500">Logout</Link>
          </div>
          <header>
            <h2 className="text-6xl text-gray-700 font-semibold">Receipes</h2>
            <h3 className="text-xl text-gray-400 italic">Janessa</h3>
          </header>
          <div>
            <div className="my-4 border-b-[1px] border-zinc-300 py-2 font-semibold">Latest Recipes</div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card hover:shadow-xl">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-4">
                  <span>Veg noodles</span>
                  <span className="block text-zinc-400 text-sm">Recipe by Mario</span>
                </div>
                <div className="px-2 py-1 rounded-full bg-zinc-300 absolute top-0 ml-2 mt-2">
                  <svg className="w-5 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card hover:shadow-xl">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-4">
                  <span>Veg noodles</span>
                  <span className="block text-zinc-400 text-sm">Recipe by Mario</span>
                </div>
                <div className="px-2 py-1 rounded-full bg-zinc-300 absolute top-0 ml-2 mt-2">
                  <svg className="w-5 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
              <div className="card hover:shadow-xl">
                <Image src={noodles} alt="noodles" className="w-full object-cover"/>
                <div className="p-4">
                  <span>Veg noodles</span>
                  <span className="block text-zinc-400 text-sm">Recipe by Mario</span>
                </div>
                <div className="px-2 py-1 rounded-full bg-zinc-300 absolute top-0 ml-2 mt-2">
                  <svg className="w-5 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>25 mins</span>
                </div>
              </div>
            </div>
            <div className="my-5">Most popular</div>
            <div className="flex justify-center">
              <div className="px-4 py-2 bg-slate-400 rounded-full hover:scale-125 transition ease-in-out duration-200 cursor-pointer">Load more</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
