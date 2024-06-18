import {Metadata} from "next"

export const metadata:Metadata = {
  title: {
    absoute: "", // ignore the template defined in parent
    default: "Next.js by default", // it will show when child hasn't one defined
    template: "%s | by JanessaTech"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header
        style={{
          backgroundColor:"lightblue",
          padding:"1rem"
        }}>
          <p>Header</p>
        </header>
        {children}
        <footer style={{
           backgroundColor:"ghostwhite",
           padding:"1rem"
        }}>
          <p>Footer</p>
        </footer>
      </body>
    </html>
  )
}
