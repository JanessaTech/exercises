'use client'

import React from "react"
import { RecoilRoot } from "recoil"

type RecoilProviderType = {
    children: React.ReactNode
}
const RecoilProvider: React.FC<RecoilProviderType> = ({children}) => {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}

export default RecoilProvider