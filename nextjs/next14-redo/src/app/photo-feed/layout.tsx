import React from "react";


export default function PhotoFeedLayout({children, modal}: {children: React.ReactNode, modal: React.ReactNode}) {
    return (
        <div>
            {modal}
            {children}
        </div>
    )
}