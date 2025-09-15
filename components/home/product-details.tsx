"use client"

import { Button } from "@/components/ui/button"
import { Heart, Share2, ShoppingCart, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  inStock: boolean
  description?: string
  features?: string[]
  nutritionalInfo?: string
}

interface ProductDetailsProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductDetails({ product, isOpen, onClose, onAddToCart }: ProductDetailsProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
        <Button
          variant="ghost"
          onClick={onClose}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image - Responsive & Scrollable */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 w-full">
              <Image
                height={600}
                width={600}
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto max-h-[400px] object-contain mx-auto"
                priority
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded text-sm font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">({product.rating})</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm w-fit ${
                    product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-2xl md:text-3xl font-bold text-green-600">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg md:text-xl text-gray-500 line-through">৳{product.originalPrice}</span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base">{product.description}</p>

            {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.nutritionalInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{product.nutritionalInfo}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Button
                onClick={() => {
                  onAddToCart(product)
                  onClose()
                }}
                disabled={!product.inStock}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 h-12"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <div className="flex space-x-3 sm:space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-gray-600 hover:text-red-500 bg-transparent h-12 w-12"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-gray-600 hover:text-blue-500 bg-transparent h-12 w-12"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
