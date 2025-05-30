'use client'

import Link from "next/link";

export default function Home() {

  return (
    <div className="ml-10">
      <div><Link href='/basic'> Basic usage</Link></div>
      <div><Link href='/contract'> Read a contract</Link></div>
      <div><Link href='/tx'> Send a transaction</Link></div>
      <div><Link href='/monitorContract'> Monitor a contract</Link></div>
      <div><Link href='/writecontract'> Write a contract</Link></div>
    </div>
  ) ;
}
