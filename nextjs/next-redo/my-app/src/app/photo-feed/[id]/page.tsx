
import Image from "next/image"
import wonderImages from "../wonders"

export default function PhotoPage({params: {id}}: {params: {id: string}}) {
    const photo = wonderImages.find((w) => w.id === id)
    return (
        <div>
            {photo ? 
                <Image src={photo.src} alt={photo.name}></Image> 
                : <div>No photo</div>}
        </div>
    )
}