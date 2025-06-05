import Link from "next/link";
import wonderImages from "./data";
import Image from "next/image";

export default function PhotoFeedPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
            {
                wonderImages.map(({id, name, src}) => {
                    return (
                        <div className="rounded-xl w-full shadow-sm hover:shadow-xl bg-white overflow-hidden">
                            <Link key={id} href={`/photo-feed/${id}`}>
                                <Image src={src} alt={name} className="w-full object-cover"></Image>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}