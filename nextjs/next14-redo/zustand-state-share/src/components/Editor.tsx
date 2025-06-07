'use client'
import useAddNote from "@/lib/store"
import { useState } from "react"

type EditorProps = {}
const Editor: React.FC<EditorProps> = () => {
    const [input, setInput] = useState('')
    const {addNote, clear} = useAddNote()

    const handleSubmit = () => {
        addNote(input)
        setInput('')
    }

    return (
        <div className="col-span-2 h-96 bg-purple-100 p-10">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/> {input}
            <button className="bg-gray-400 rounded-full block my-3 p-2" onClick={handleSubmit}>Add Note</button>
            <button className="bg-red-600 rounded-full block p-2" onClick={() => clear()}>Clear</button>
        </div>
    )
}

export default Editor