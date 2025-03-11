'use client';

import Image from "next/image"
import wonderImages from "./wonders"
import Link from "next/link";

export default function PhotoFeedLayout() {
    return (
        <div className="w-full m-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
                {
                    wonderImages.map(({id, src, name}) => {
                        return (
                            <Link href={`photo-feed/${id}`} key={id}>
                                <Image src={src} alt={name} className="w-full object-cover"></Image>
                            </Link>  
                        )
                    })
                }
            </div>
        </div>
    )
}