'use client'
import { useRef, useState } from "react"
import "./style.css"

const ManipulateCSS:React.FC<{}> = ()  => {
    const target = useRef<HTMLDivElement>(null)
    const [left, setLeft] = useState(0)
    const [width, setWidth] = useState(0)

    const leftChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLeft(Number(e.target.value))
    }
    const widthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setWidth(Number(e.target.value))
    }

    const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (target.current) {
            target.current.style.left = `${left}%`
            target.current.style.width = `${width}%`
        }
    }

    console.log('left=', left, '  width=', width)

    return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
            <div className="w-[400px] h-[400px] bg-zinc-300 relative">
                <div className="h-10 absolute bg-pink-600 w-2" ref={target}></div>
            </div>
            <div className="my-2 flex items-center">
                <div>
                    <span>Left:</span> <input 
                        type="number" 
                        defaultValue={0}
                        value={left}
                        className="border-[1px] border-zinc-500 px-2 focus:border-pink-400 rounded-md" 
                        onChange={leftChange}
                        max={100} min={0}/><span className="mr-3">%</span>
                    <span>Width:</span> <input 
                        type="number" 
                        defaultValue={0}
                        value={width}
                        onChange={widthChange}
                        className="border-[1px] border-zinc-500 px-2 focus:border-pink-400 rounded-md" 
                        max={100} min={0}/><span className="mr-3">%</span>
                </div>
                <button className="px-2 py-1 rounded-full bg-zinc-500 active:bg-zinc-400 mx-2" onClick={handleApply}>Apply</button>
            </div>

        </div>
    )
}

export default ManipulateCSS