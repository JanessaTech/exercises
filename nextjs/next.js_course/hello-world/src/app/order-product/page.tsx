"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
export default function OrderProduct() {
    const router = useRouter()
    const handleClick = () => {
        console.log("placing your order")
        router.push("/")
    }
  return (
    <>
    <h1>Order product</h1>
    <button onClick={handleClick}>Place order</button>
    </>
  )
}

