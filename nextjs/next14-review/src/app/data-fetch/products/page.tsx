
type Product = {
    id: number;
    title: string;
    price: number;
    description: string
}

export default async function ProductsPage() {
    const res = await fetch('http://localhost:3001/products', {
        cache: 'no-store'
    })
    const products = await res.json()
    return (
        <div className="grid grid-cols-2 gap-6">
            {
                products.map((product: Product) => {
                    return (
                        <div key={product.id} className="bg-zinc-200 rounded-md p-4">
                                <div className="flex">
                                    <div className="font-semibold">id:</div><div>{product.id}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-semibold">title:</div><div>{product.title}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-semibold">price:</div><div>{product.price}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-semibold">description:</div><div>{product.description}</div>
                                </div>
                        </div>
                    )
                })
            }
        </div>
    )
}