import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Hello world</div>
      <div><Link href="/blog">go to Blog</Link></div>
      <br />
      <div><Link href="/products">go to products</Link></div>
      <div><Link href="/dashboard">go to dashboard</Link></div>
    </>
  );
}
