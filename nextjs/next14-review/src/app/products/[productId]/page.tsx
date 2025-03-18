
import { Metadata } from "next";

export const generateMetadata = ({params}: Props): Metadata => {
  return {
    title: `Product ${params.productId}`
  }
}

type Props = {
  params: {
    productId: string
  }
}

function getRandomInt(count: number) {
  return Math.floor(Math.random() * count)
}

export default function ProductDetail({params}: Props) {
    const random = getRandomInt(2)
    if (random === 1) {
      throw new Error('Error loading products by JanessaTech')
    }
    return (
      <div>ProductDetail page:{params.productId}</div>
    );
  }
  