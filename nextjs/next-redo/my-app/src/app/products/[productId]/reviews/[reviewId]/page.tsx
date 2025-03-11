

import { notFound } from "next/navigation";

function getRandomInt(count: number) {
  return Math.floor(Math.random() * count)
}

export default function ReviewDetails({params}: {params: {
    productId: string,
    reviewId: string
}}) {

    const random = getRandomInt(2)
    if (random === 1) {
      throw new Error('Error loading review by JanessaTech')
    }
    if(parseInt(params.reviewId) > 1000) {
        notFound()
    }
    return (
      <div>Review {params.reviewId} from product {params.productId}</div>
    );
  }