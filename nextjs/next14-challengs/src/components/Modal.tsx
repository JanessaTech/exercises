'use client'

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function Modal({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const img = useRef<any>(null)
    const onClick= (e: React.MouseEvent<HTMLElement>) => {
        if (img.current.contains(e.target)) {
            router.back()
        }
    }

    const onkeydown = (e:KeyboardEvent) => {
        if (e.key === 'Escape') {
            router.back()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onkeydown)
        return () => document.removeEventListener('keydown', onkeydown)
    })

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40" onClick={onClick}>
            <div className="absolute top-1/4 left-1/4 p-10 bg-white rounded-xl w-1/2 h-1/2" ref={img}>
                {children}
            </div>
        </div>
    )
}