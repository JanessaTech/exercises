'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const navLinks = [
    {name : 'Register', href: '/register'}, 
    {name : 'Login', href: '/login'}, 
    {name : 'ForgetPassword', href: '/forgot-password'}, 
]

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const pathName = usePathname()
    const [input, setInput] = useState<string>('')
    return (
        <div>
            <div>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
            {
                navLinks.map((link) => {
                    const isActive = pathName.startsWith(link.href)
                    return (<Link key={link.name} href={link.href} className={`mr-4 ${isActive ? 'font-bold' : 'text-blue-400'}`}>{link.name}</Link>)
                })
            }
            {children}
        </div>
        
    );
  }