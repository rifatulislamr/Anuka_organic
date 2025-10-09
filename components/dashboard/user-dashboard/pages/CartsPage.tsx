// 'use client'

// import React, { useState, useCallback, useEffect } from 'react'
// import { fetchCarts, deleteCart } from '@/api/cart-api'
// import { useAtom } from 'jotai'
// import { tokenAtom, useInitializeUser } from '@/utils/user'
// import { GetCart } from '@/utils/type'
// import { Button } from '@/components/ui/button'
// import { Trash2 } from 'lucide-react'
// import Image from 'next/image'

// const CartsPage = () => {
//   useInitializeUser() // initialize user info

//   const [token] = useAtom(tokenAtom)
//   const [carts, setCarts] = useState<GetCart[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // ✅ Fetch all carts
//   const loadCarts = useCallback(async () => {
//     if (!token) {
//       setError('Please log in to view your cart.')
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)
//       const res = await fetchCarts(token)

//       if (!res || !res.data) {
//         setError('No carts found.')
//         return
//       }

//       setCarts(res.data)
//     } catch (err) {
//       console.error('Failed to load carts:', err)
//       setError('Failed to load carts.')
//     } finally {
//       setLoading(false)
//     }
//   }, [token])

//   // ✅ Delete a specific cart item
//   const handleDelete = useCallback(
//     async (productId: number) => {
//       if (!token) {
//         setError('Please log in to delete cart items.')
//         return
//       }

//       try {
//         await deleteCart(token, productId)
//         // refresh cart after delete
//         setCarts((prev) => prev.filter((item) => item.productId !== productId))
//       } catch (err) {
//         console.error('Failed to delete cart:', err)
//         setError('Failed to delete cart.')
//       }
//     },
//     [token]
//   )

//   useEffect(() => {
//     loadCarts()
//   }, [loadCarts])

//   if (loading) return <p className="text-gray-600">Loading carts...</p>
//   if (error) return <p className="text-red-500">{error}</p>

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-gray-800 mb-4">My Cart</h1>
//       <div className="bg-white rounded-lg shadow p-6">
//         {carts.length === 0 ? (
//           <p className="text-gray-600">Your cart is empty.</p>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr>
//                 <th className="border-b p-3 w-16">#</th>
//                 <th className="border-b p-3">Image</th>
//                 <th className="border-b p-3">Product Name</th>
//                 <th className="border-b p-3">Price</th>
//                 <th className="border-b p-3">Quantity</th>
//                 <th className="border-b p-3">Added On</th>
//                 <th className="border-b p-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {carts.map((item, index) => (
//                 <tr key={item.cartId} className="hover:bg-gray-50">
//                   <td className="p-3">{index + 1}</td>
//                    <td className="px-4 py-2 border">
//                                      <div className="w-20 h-20 relative mx-auto">
//                                        <Image
//                                          src={item.url}
//                                          alt={item.name}
//                                          fill
//                                          className="object-cover rounded"
//                                        />
//                                      </div>
//                                    </td>
//                   <td className="p-3">{item.name}</td>
//                 <td className="p-3">৳{item.price * item.quantity}</td>
//                   <td className="p-3">{item.quantity}</td>

//                   <td className="p-3">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 text-center">
//                     <Button
//                       variant="destructive"
//                       size="icon"
//                       className="bg-red-500 hover:bg-red-600"
//                       onClick={() => handleDelete(item.productId)}
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CartsPage


'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { fetchCarts, deleteCart } from '@/api/cart-api'
import { useAtom } from 'jotai'
import { tokenAtom, useInitializeUser } from '@/utils/user'
import { GetCart } from '@/utils/type'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

const CartsPage = () => {
  useInitializeUser() // initialize user info

  const [token] = useAtom(tokenAtom)
  const [carts, setCarts] = useState<GetCart[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Fetch all carts
  const loadCarts = useCallback(async () => {
    if (!token) {
      setError('Please log in to view your cart.')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const res = await fetchCarts(token)

      if (!res || !res.data) {
        setError('No carts found.')
        return
      }

      setCarts(res.data)
    } catch (err) {
      console.error('Failed to load carts:', err)
      setError('Failed to load carts.')
    } finally {
      setLoading(false)
    }
  }, [token])

  // ✅ Delete a specific cart item
  const handleDelete = useCallback(
    async (productId: number) => {
      if (!token) {
        setError('Please log in to delete cart items.')
        return
      }

      try {
        await deleteCart(token, productId)
        // refresh cart after delete
        await loadCarts()
      } catch (err) {
        console.error('Failed to delete cart:', err)
        setError('Failed to delete cart.')
      }
    },
    [token, loadCarts]
  )

  useEffect(() => {
    loadCarts()
  }, [loadCarts])

  if (loading) return <p className="text-gray-600">Loading carts...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">My Cart</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {carts.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3 w-16">#</th>
                <th className="border-b p-3">Image</th>
                <th className="border-b p-3">Product Name</th>
                <th className="border-b p-3">Price</th>
                <th className="border-b p-3">Quantity</th>
                <th className="border-b p-3">Added On</th>
                <th className="border-b p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={item.cartId} className="hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                   <td className="px-4 py-2 border">
                                     <div className="w-20 h-20 relative mx-auto">
                                       <Image
                                         src={item.url}
                                         alt={item.name}
                                         fill
                                         className="object-cover rounded"
                                       />
                                     </div>
                                   </td>
                  <td className="p-3">{item.name}</td>
                <td className="p-3">৳{item.price * item.quantity}</td>
                  <td className="p-3">{item.quantity}</td>

                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(item.productId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CartsPage