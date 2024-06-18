"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import '../globals.css'
import { useState } from "react"

const navLinks = [
    {name: "Register", href: "/register2"},
    {name: "Login", href: "/login2"},
    {name: "Forgot Password", href: "/forgot-password"}
]

export default function Auth2Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathname = usePathname()
    const [input, setinput] = useState("")

    console.log("pathname", pathname)
    
    return (
      <>
      <div>
        <input value={input} onChange={(e) => setinput(e.target.value)} className="border-2 border-red-700"></input>
      </div>
      {
        navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            //
            return <Link href={link.href} key={link.name} 
            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}>{link.name}</Link>
        })
      }
        {children}
      </>
    )
  }
