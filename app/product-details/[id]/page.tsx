'use client'

import '../../globals.css'
import ProductDetails from '@/components/product/product-details'
import { products } from '@/data/products'
import { useState } from 'react'
import { use } from 'react' // ✅ new React API

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params) // ✅ unwrap with React.use()
  const [isOpen, setIsOpen] = useState(true)

  const product = products.find((p) => p.id === parseInt(id))

  if (!product) return <div>Product not found</div>

  return (
    <ProductDetails
      product={product}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onAddToCart={(p) => {
        console.log('Added to cart:', p)
      }}
    />
  )
}
