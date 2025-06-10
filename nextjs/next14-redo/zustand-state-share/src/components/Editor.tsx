
'use client'
import useAddNote from "@/lib/store"
import { useState } from "react"


const Editor: React.FC<{}> = () => {
    const {notes, isDone, addNote, clear} = useAddNote()
    const [input, setInput] = useState('')


    const onClick = () => {
        addNote(input)
        setInput('')
    }

    return (
        <div className="bg-red-100 h-80">
            <input type="text" className="border-[2px] border-black my-6 mx-4" value={input} onChange={(e) => setInput(e.target.value)}/> {input}
            <button className="block bg-zinc-400 rounded px-2 py-1 mx-4 my-5" onClick={onClick}>Add Note</button>
            <button className="block bg-red-400 rounded px-2 py-1 mx-4" onClick={clear}>clear</button>
        </div>
    )
}

export default Editor