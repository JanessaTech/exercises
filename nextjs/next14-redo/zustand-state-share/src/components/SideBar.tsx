'use client'
import useAddNote from "@/lib/store"

type SideBarProps = {}
const Sidebar: React.FC<SideBarProps> = () => {
    const {notes, isDone} = useAddNote()
    return (
        <div className="p-5 col-span-1 h-96 bg-red-100">
            <ul>
                {
                    isDone ? 
                    notes.map((note, index) => (
                        <div key={index}>{note}</div>
                    )) : <div>Loading...</div>
                }
            </ul>
        </div>
    )
}

export default Sidebar