import { Product } from "@/components/product";
import { Reviews } from "@/components/reviews";
import { Suspense } from "react";

export default function ProductDetailPage() {
    return (
        <div>
            <Suspense fallback={<p>Loading product details...</p>}>
                <Product/>
            </Suspense>
            <Suspense fallback={<p>Loading review details...</p>}>
                <Reviews/>
            </Suspense>
        </div>
    )
}