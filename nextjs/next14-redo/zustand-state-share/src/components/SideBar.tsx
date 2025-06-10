'use client'
import useAddNote from "@/lib/store"

const SideBar:React.FC<{}> = () => {
    const {notes, isDone} = useAddNote()

    return (
        <div className="bg-yellow-100 h-80">
            <ul>
            {
                isDone ? notes.map((note, i) => (
                    <li key={i}>{note}</li>
                )): <div>Loading</div>
            }
            </ul>
           
        </div>
    )
}

export default SideBar