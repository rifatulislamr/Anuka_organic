'use client'

import React from 'react'

type CartItem = {
  cartId: number
  productId: number
  name: string
  price: number
  quantity: number
  createdAt: string
}

const sampleCarts: CartItem[] = [
  {
    cartId: 1,
    productId: 101,
    name: 'Product One',
    price: 50,
    quantity: 2,
    createdAt: '2025-10-05T06:10:45.000Z',
  },
  {
    cartId: 2,
    productId: 102,
    name: 'Product Two',
    price: 75,
    quantity: 1,
    createdAt: '2025-10-05T07:20:30.000Z',
  },
]

const CartsPage = () => (
  <div>
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">My Cart</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-3">Cart ID</th>
            <th className="border-b p-3">Product Name</th>
            <th className="border-b p-3">Quantity</th>
            <th className="border-b p-3">Price</th>
            <th className="border-b p-3">Added On</th>
          </tr>
        </thead>
        <tbody>
          {sampleCarts.map((item) => (
            <tr key={item.cartId} className="hover:bg-gray-50">
              <td className="p-3">#{item.cartId}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">${item.price}</td>
              <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default CartsPage
