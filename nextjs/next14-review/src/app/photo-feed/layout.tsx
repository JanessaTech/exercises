export default function PhotoFeedLayout({
    children,
    modal
}:Readonly<{
    children: React.ReactNode,
    modal: React.ReactNode
}>) {
    return (
        <div>
            {modal}
            {children}
        </div>
    )
}
