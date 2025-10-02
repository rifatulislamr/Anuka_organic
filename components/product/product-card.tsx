// 'use client'

// import { Button } from '@/components/ui/button'
// import { ShoppingCart, Star } from 'lucide-react'
// import Image from 'next/image'
// import { useState } from 'react'

// interface Product {
//   id: number
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   category: string
//   rating: number
//   inStock: boolean
//   description?: string
//   features?: string[]
//   nutritionalInfo?: string
// }

// interface ProductCardProps {
//   product: Product
//   onProductClick: (product: Product) => void
//   onAddToCart: (product: Product) => void
// }

// export default function ProductCard({
//   product,
//   onProductClick,
//   onAddToCart,
// }: ProductCardProps) {
//   const [isImageHovered, setIsImageHovered] = useState(false)
//   const [isButtonHovered, setIsButtonHovered] = useState(false)

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
//       {/* Image Section with hover zoom */}
//       <div
//         className="aspect-square relative overflow-hidden"
//         onClick={() => onProductClick(product)}
//         onMouseEnter={() => setIsImageHovered(true)}
//         onMouseLeave={() => setIsImageHovered(false)}
//       >
//         <Image
//           height={300}
//           width={300}
//           src={product.image || '/placeholder.svg'}
//           alt={product.name}
//           className={`w-full h-full object-cover transition-transform duration-700 ${
//             isImageHovered ? 'scale-100' : 'scale-110'
//           }`}
//         />
//         {product.originalPrice && (
//           <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//             {Math.round(
//               ((product.originalPrice - product.price) /
//                 product.originalPrice) *
//                 100
//             )}
//             % OFF
//           </div>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="p-4" onClick={() => onProductClick(product)}>
//         <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
//           {product.name}
//         </h3>

//         <div className="flex items-center mb-2">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-3 h-3 md:w-4 md:h-4 ${
//                   i < Math.floor(product.rating)
//                     ? 'text-yellow-400 fill-current'
//                     : 'text-gray-300'
//                 }`}
//               />
//             ))}
//             <span className="text-xs md:text-sm text-gray-500 ml-1">
//               ({product.rating})
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center space-x-2">
//             <span className="text-base md:text-lg font-bold text-gray-900">
//               ৳{product.price}
//             </span>
//             {product.originalPrice && (
//               <span className="text-xs md:text-sm text-gray-500 line-through">
//                 ৳{product.originalPrice}
//               </span>
//             )}
//           </div>
//           <span
//             className={`text-xs px-2 py-1 rounded ${
//               product.inStock
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-red-100 text-red-800'
//             }`}
//           >
//             {product.inStock ? 'In Stock' : 'Out of Stock'}
//           </span>
//         </div>

       
//         <Button
//           onClick={(e) => {
//             e.stopPropagation()
//             onAddToCart(product)
//           }}
//           onMouseEnter={() => setIsButtonHovered(true)}
//           onMouseLeave={() => setIsButtonHovered(false)}
//           disabled={!product.inStock}
//           className="min-w-full text-white disabled:bg-gray-300 transition-all duration-500 text-sm md:text-base h-9 md:h-10 
//              bg-green-500 hover:bg-green-800"
//         >
//           <div className="relative flex items-center justify-center overflow-hidden h-5 md:h-5">
//             {/* Text */}
//             <div
//               className={`transition-transform duration-500 ease-in-out ${
//                 isButtonHovered ? '-translate-y-full' : 'translate-y-0'
//               }`}
//             >
//               <span className="block">Add to Cart</span>
//             </div>

//             {/* Shopping Cart */}
//             <div
//               className={`absolute transition-transform duration-500 ease-in-out ${
//                 isButtonHovered ? 'translate-y-0' : 'translate-y-full'
//               }`}
//             >
//               <ShoppingCart className="w-4 h-3 md:w-6 md:h-6" />
//             </div>
//           </div>
//         </Button>
//       </div>
//     </div>
//   )
// }



'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
   onProductClick: (product: Product) => void
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const router = useRouter()

  const handleProductClick = () => {
    router.push(`/product-details/${product.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Image Section with hover zoom */}
      <div
        className="aspect-square relative overflow-hidden"
        onClick={handleProductClick}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <Image
          height={300}
          width={300}
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isImageHovered ? 'scale-100' : 'scale-110'
          }`}
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4" onClick={handleProductClick}>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs md:text-sm text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-base md:text-lg font-bold text-gray-900">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>
          <span
            className={`text-xs px-2 py-1 rounded ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

       
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          disabled={!product.inStock}
          className="min-w-full text-white disabled:bg-gray-300 transition-all duration-500 text-sm md:text-base h-9 md:h-10 
             bg-green-500 hover:bg-green-800"
        >
          <div className="relative flex items-center justify-center overflow-hidden h-5 md:h-5">
            {/* Text */}
            <div
              className={`transition-transform duration-500 ease-in-out ${
                isButtonHovered ? '-translate-y-full' : 'translate-y-0'
              }`}
            >
              <span className="block">Add to Cart</span>
            </div>

            {/* Shopping Cart */}
            <div
              className={`absolute transition-transform duration-500 ease-in-out ${
                isButtonHovered ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              <ShoppingCart className="w-4 h-3 md:w-6 md:h-6" />
            </div>
          </div>
        </Button>
      </div>
    </div>
  )
}