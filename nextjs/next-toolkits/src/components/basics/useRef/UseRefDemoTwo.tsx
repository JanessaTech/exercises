'use client'

import { MouseEvent, useRef } from "react"

export default function UseRefDemoTwo() {
    const outer = useRef(null)
    const inner = useRef(null)

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        //console.log(e)
        if (e.target === outer.current) {
            console.log('you click outer')
        }
        if (e.target === inner.current) {
            console.log('you click inner')
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center" onClick={onClick}>
            <div className="w-1/2 h-1/2 bg-zinc-200 flex justify-center items-center" ref={outer}>
             <div className="w-1/2 h-1/2 bg-blue-200" ref={inner}></div>
            </div>
        </div>
    )
}

// the demo shows how to use useRef to figure out which element is clicked on
// The below link shows how to use useRef to implement a modal
// https://github.com/gopinav/Next.js-14-Tutorials/blob/main/routing-demo/src/components/modal.tsx