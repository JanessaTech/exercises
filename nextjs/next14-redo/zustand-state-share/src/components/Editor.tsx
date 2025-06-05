'use client'
import useAddNote from "@/lib/store"
import { useState } from "react"

type EditorProps = {}
const Editor: React.FC<EditorProps> = () => {
    const [input, setInput] = useState('')
    const {addNote} = useAddNote()

    const handleClick = () => {
        addNote(input)
        setInput('')
    }
    return (
        <div className="p-5 col-span-2 h-96 bg-yellow-100">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>{input}
            <button onClick={handleClick} className="bg-zinc-200 rounded-full px-2 py-1 block my-2">Add Note</button>
        </div>
    )
}

export default Editor