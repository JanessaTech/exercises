import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './dojo-logo.png'

export default function NavBar() {
  return (
    <nav>
        <Image
        src={Logo}
        alt='Dojo Helpdesk logo'
        width={70}
        quality={100}
        placeholder='blur'
        />
        <h1>Dojo Helperdesk</h1>
        <Link href='/'>Dashboard</Link>
        <Link href='/tickets'>Tickets</Link>
    </nav>
  )
}

