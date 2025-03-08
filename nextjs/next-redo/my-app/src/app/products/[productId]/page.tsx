
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

export default function ProductDetail({params}: Props) {
    return (
      <div>ProductDetail page:{params.productId}</div>
    );
  }
  