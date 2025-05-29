'use client'

import Link from "next/link";

export default function Home() {

  return (
    <div>
      <div>
        <Link href='/basic'> Basic usage</Link>
      </div>
      <div><Link href='/contract'> call contract usage</Link></div>
    </div>
  ) ;
}
