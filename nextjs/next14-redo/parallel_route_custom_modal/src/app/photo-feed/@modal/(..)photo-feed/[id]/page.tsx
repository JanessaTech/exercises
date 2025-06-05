import wonderImages from "@/app/photo-feed/data"
import Modal from "@/components/Modal"
import Image from "next/image"

export default function InterceptedPhoto({params: {id}} :{params: {id: string}}) {
    const photo = wonderImages.find((w) => w.id === id)
    return (
        <Modal>
            <div>
                {
                    photo ? <div><Image src={photo.src} alt={photo.name} className="w-full object-cover"></Image></div> : <div></div>
                }
            </div>
        </Modal>
       
    )
}