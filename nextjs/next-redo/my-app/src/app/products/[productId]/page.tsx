export default function ProductDetail({params}: {params: {productId: string}}) {
    return (
      <div>ProductDetail page:{params.productId}</div>
    );
  }
  