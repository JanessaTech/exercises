import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <h1>Home page. Hi, Janessa</h1>
    <Link href="/blog">Blog</Link>
    <p></p>
    <Link href="product">Products</Link>
    </>
  )
}

