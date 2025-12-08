'use client'

import { useConnection } from "wagmi";

export default function Profile() {
    const { address } = useConnection()
    return (
        <div>address: {address}</div>
    )
}