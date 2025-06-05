import Image from "next/image"
import wonderImages, {type WonderImage} from "../data"
export default function PhotoDetailPage ({params: {id}}: {params: {id: string}}) {
    console.log(id, typeof id)
    const photo = wonderImages.find((w) => w.id === id)
    return (
        <div>
            {
                photo ? <Image src={photo.src} alt={photo.name}></Image> : <div>no photo</div>
            }
            
        </div>
    )
}