import Image from "next/image"
import wonderImages from "../data"

export default function Detail({params: {id}}: {params: {id: string}}) {
    console.log(id)
    const photo = wonderImages.find((w) => w.id === id)
    return (
        <div>
            {
                photo ? <div><Image src={photo.src} alt={photo.name}></Image></div> : <div></div>
            }
        </div>
    )
}