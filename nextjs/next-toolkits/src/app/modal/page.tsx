
import { Modal } from "@/components/modal/Modal"
import Image from "next/image"
import lizard from '../../../public/imgs/lizard.png'

export default function ModalPage() {
    
    return (
        <div>
            <Modal>
                {/* <img src="/imgs/lizard.png" /> */}
                <Image src={lizard}  alt=''/>
            </Modal>
        </div>
    )
}