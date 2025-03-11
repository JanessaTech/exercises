'use client'

import {  Dialog,  
    DialogContent,  
    DialogTrigger,
} from "@/components/ui/dialog"
import wonderImages  from "@/app/photo-feed/wonders";
import type {WonderImage} from "@/app/photo-feed/wonders";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function InterceptedPhoto({params: {id}}: {params: {id: string}}) {
    const photo: WonderImage = wonderImages.find((p) => p.id === id)!
    const router = useRouter()

    const handOpenChange = (open: boolean) => {
        console.log('handOpenChange:', open)
        if (!open) {
            router.back()  // backforward when the dialog is closed
        }
        
    }
    return (
        <div>
            <div>
                <Dialog onOpenChange={handOpenChange}>  
                    <DialogTrigger>Show</DialogTrigger>  
                    <DialogContent>    
                        <Image src={photo.src} alt={photo.name}></Image>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
       
    )
}