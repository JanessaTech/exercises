'use client'
import useAddNote from "@/lib/store"

type SidebarProps = {}
const Sidebar: React.FC<SidebarProps> = () => {
    const {notes} = useAddNote()
    return (
        <div className="p-5 col-span-1 h-96 bg-red-100">
            <ul>
                {
                    notes.map((note, index) => (
                        <div key={index}>{note}</div>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar