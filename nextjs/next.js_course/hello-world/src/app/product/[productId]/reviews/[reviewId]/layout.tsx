export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        {children}
        <h2>Feature products</h2>
      </>
    )
  }