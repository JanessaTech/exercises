import Link from "next/link";
import wonderImages from "./data";
import Image from "next/image";

export default function PhotoFeed() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
            {
                wonderImages.map(({id, name,src}) => {
                    return (
                        <div className="w-full rounded-lg shadow-md bg-white overflow-hidden hover:shadow-2xl">
                            <Link key={id} href={`/photo-feed/${id}`}>
                                <Image  src={src} alt={name}></Image>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}