import Link from "next/link";
export default function ProductList() {
  const productId = 100
    return (
      <>
      <div>
        <Link href="/">Home</Link>
        <h1>Product List</h1>
        <h2><Link href='/products/1'>Product1</Link></h2>
        <h2><Link href='/products/2'>Product2</Link></h2>
        <h2><Link href='/products/3' replace>Product3</Link></h2>
        <h2><Link href={`/products/${productId}`}>Product{productId}</Link></h2>
      </div>
      </>
    );
  }