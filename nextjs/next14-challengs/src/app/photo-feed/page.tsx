import Link from "next/link"
import wonderImages from "./data"
import Image from "next/image"

export default function PhotoFeed() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-10">
            {
                wonderImages.map(({id, src, name}) => {
                    return (
                        <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer">
                            <Link href={`/photo-feed/${id}`}  key={id}>
                                <Image src={src} alt={name} className="w-full object-cover"></Image>
                            </Link>
                            
                        </div>)
                })
            }
        </div>
    )
}