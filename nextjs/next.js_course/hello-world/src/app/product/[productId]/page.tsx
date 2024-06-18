import React from 'react'
import { Metadata } from "next"

export const generateMetadata = ({params}: Props): Metadata => {
  return {
    title: `Product ${params.productId}`
  }
}
type Props = {
  params : {
    productId: string
  }
}
export default function ProductDetails({params}: Props) {
    return (
     <h1>Product details {params.productId}</h1>
    )
  }

