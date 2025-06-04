
'use client'

import useAddNote from "@/lib/store"

type SideBarProps = {}
const SideBar: React.FC<SideBarProps> = () => {

    const {notes} = useAddNote()
    return (
        <div className="col-span-1 h-96 bg-green-100 p-10">
            <ul>
                {
                    notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideBar