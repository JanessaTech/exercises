'use client'
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export function Modal({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const img = useRef<any>(null)

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        if (img.current?.contains(e.target)) {
            router.push('/')
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            console.log('pressed Escape')
            router.push('/')
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    })

    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10" onClick={onClick}>
            <div className="absolute bg-white top-1/4 left-1/4 rounded-xl p-4" ref={img}>
                {children}
            </div>
        </div>
    )
}