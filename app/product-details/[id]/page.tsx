// 'use client'

// import '../../globals.css'
// import ProductDetails from '@/components/product/product-details'
// import { products } from '@/data/products'
// import { useState } from 'react'
// import { use } from 'react' // ✅ new React API

// export default function ProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = use(params) // ✅ unwrap with React.use()
//   const [isOpen, setIsOpen] = useState(true)

//   const product = products.find((p) => p.id === parseInt(id))

//   if (!product) return <div>Product not found</div>

//   return (
//     <ProductDetails
//       product={product}
//       isOpen={isOpen}
//       onClose={() => setIsOpen(false)}
//       onAddToCart={(p) => {
//         console.log('Added to cart:', p)
//       }}
//     />
//   )
// }


'use client'

import '../../globals.css'
import ProductDetails from '@/components/product/product-details'
import { useState, useEffect } from 'react'
import { use } from 'react'
import { fetchProducts } from '@/api/product-api'
import { useAtom } from 'jotai'
import { tokenAtom, useInitializeUser } from '@/utils/user'
import { GetProduct } from '@/utils/type'

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  useInitializeUser()
  const [token] = useAtom(tokenAtom)

  const [product, setProduct] = useState<GetProduct | null>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProducts(token)
        if (response?.data) {
          const found = response.data.find((p) => p.id === parseInt(id))
          setProduct(found || null)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      loadProduct()
    }
  }, [token, id])

  if (loading) return <div>Loading product...</div>
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
