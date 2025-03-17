'use client'

import wonderImages  from "@/app/photo-feed/wonders";
import type {WonderImage} from "@/app/photo-feed/wonders";
import Image from "next/image";
import { MyModal } from "@/components/MyModal";


export default function InterceptedPhoto({params: {id}}: {params: {id: string}}) {
    const photo: WonderImage = wonderImages.find((p) => p.id === id)!

    return (
        <div>
            <MyModal>
                <Image src={photo.src} alt={photo.name}></Image>
            </MyModal>
        </div>
       
    )
}