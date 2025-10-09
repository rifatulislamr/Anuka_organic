"use client"

import { Button } from "@/components/ui/button"
import { Heart, Share2, ShoppingCart, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { GetProduct } from "@/utils/type"

interface ProductDetailsProps {
  product: GetProduct
   isOpen: boolean
   onClose: () => void
   onAddToCart: (product: GetProduct) => void
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const addToCart = (product: GetProduct) => {
    alert(`Added ${product.name} to cart!`)
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side - Image */}
          <div className="flex justify-center items-start">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 w-full max-w-md">
              <Image
                height={600}
                width={600}
                src={product.url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain"
                priority
              />
              {/* {product.price && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded text-sm font-medium">
                  {Math.round(((product.price - product.price) / product.price) * 100)}% OFF
                </div>
              )} */}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                {/* <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">({product.rating})</span>
                </div> */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-600">৳{product.price}</span>
              {/* {product.price && (
                <span className="text-xl text-gray-500 line-through">৳{product.price}</span>
              )} */}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>

            {/* Features */}
            {/* {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* Nutrition */}
            {/* {product.nutritionalInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{product.nutritionalInfo}</p>
              </div>
            )} */}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300 text-center min-w-[50px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => addToCart(product)}
                disabled={!product.stock}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 h-12"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-gray-600 hover:text-red-500 h-12 w-12"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-gray-600 hover:text-blue-500 h-12 w-12"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Extra Info */}
            <div className="border-t border-gray-200 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">Category:</span> {product.categoryId}
              </div>
              <div>
                <span className="font-medium text-gray-900">Product ID:</span> #{product.id}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h3>
          <p className="text-gray-600">Related products will be shown here based on category or similar items.</p>
        </div>
      </div>
    </div>
  )
}


