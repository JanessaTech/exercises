'use client'

import { useRouter } from "next/navigation"

export default function OrderProduct() {
    const router = useRouter()
    const handleClick = () => {
        console.log('place your order')
        router.push('/')
        //router.forward() 前进
        //router.back()  后退
    }

    return (
        <>
        <h1>Order product</h1>
        <button onClick={handleClick}>Place order</button>
        </>
        
    )
}