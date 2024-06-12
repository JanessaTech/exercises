import Link from 'next/link'
import Container from '../../Components/container'

export default function FirstPost(props) {
    return (
        <>
        <Container>
            <h1>My First Post</h1>
            <h2>
                <Link href="/">
                    Home
                </Link>
            </h2>
            <div>Next stars: {props?.stars}</div>
            <br/>
            <img src="/demo.png" alt="TutorialsPoint Logo" />
        </Container>    
        </>	  
     )
 }

 export async function getStaticProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return {
       props: { stars: 1111 }
    }
 }