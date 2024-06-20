import { Suspense } from 'react'
import { Product } from '@/components/product'
import { Reviews } from '@/components/reviews'
import React from 'react'

export default function ProductDetailPage() {
  return (
    <div>
        <h1>Product detail page</h1>
        <Suspense fallback={<p>Loading product detail...</p>}>
            <Product />
        </Suspense>
        <Suspense fallback={<p>Loading reviews detail...</p>}>
            <Reviews/>
        </Suspense>
        
    </div>
  )
}

