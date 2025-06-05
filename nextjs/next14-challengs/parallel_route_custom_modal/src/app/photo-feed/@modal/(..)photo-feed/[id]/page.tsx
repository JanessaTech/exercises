
import wonderImages from "@/app/photo-feed/data"
import Modal from "@/components/Modal"
import Image from "next/image"
export default function InterceptPhoto({params: {id}} : {params:{id: string}}) {
    const photo = wonderImages.find((w) => w.id === id)
    return (
        <Modal>
            <div>
                <div>intercepted photo</div>
                {
                    photo ? <Image src={photo.src} alt={photo.name} className="w-full object-cover"></Image> : <div></div>
                }
                
            </div>
        </Modal>
        
    )
}