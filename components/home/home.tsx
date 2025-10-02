'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import Image from 'next/image'

import SignIn, { UserType } from './login-form'
import RegisterForm from './register-form'
import CheckoutForm from './checkout-form'
import HeroSlider from './hero-slider'
import { products } from '@/data/products'
import Footer from '../shared/footer'
import ProductCard from '../product/product-card'
import ProductDetails from '../product/product-details'
import Navbar from '../shared/navbar' // ✅ Import Navbar properly

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

interface CartItem extends Product {
  quantity: number
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [roleId, setRoleId] = useState<number | null>(null)

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const categories = [
    'Poultry & Meat',
    'New Arrivals',
    'Best Selling',
    'Daily Needs',
    'Signature Series',
    'Pickles & Chutney',
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  // ✅ handleLogin with persistence
  const handleLogin = (user: UserType) => {
    setIsLoggedIn(true)
    setCurrentUser(user.username)
    setRoleId(user.roleId ?? 0) // fallback if roleId missing

    // Save user info to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  // ✅ Restore login state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const parsedUser: UserType = JSON.parse(savedUser)
      setIsLoggedIn(true)
      setCurrentUser(parsedUser.username)
      setRoleId(parsedUser.roleId ?? 0)
    }
  }, [])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
    setRoleId(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
  }

  const handleOrderComplete = () => {
    setCartItems([])
    alert(
      'Order placed successfully! You will receive a confirmation call shortly.'
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={filteredProducts}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        handleLogout={handleLogout}
        setIsCartOpen={setIsCartOpen}
        getTotalItems={getTotalItems}
        roleId={
          localStorage.getItem('roleId')
            ? parseInt(localStorage.getItem('roleId') as string)
            : roleId
        }
      />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Search Results */}
      {searchQuery && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Search Results for {searchQuery} ({filteredProducts.length} items)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={openProductModal}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* Product Categories */}
      {!searchQuery && (
        <main className="container mx-auto px-4 py-8">
          {categories.map((category) => (
            <section
              key={category}
              id={category.toLowerCase().replace(/\s+/g, '-')}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                >
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={openProductModal}
                      onAddToCart={addToCart}
                    />
                  ))}
              </div>
            </section>
          ))}
        </main>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={closeProductModal}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <Image
                        height={64}
                        width={64}
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-green-600 font-semibold">
                          ৳{item.price}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-green-600">
                    ৳{getTotalPrice()}
                  </span>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setIsCartOpen(false)
                    setIsCheckoutOpen(true)
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <SignIn
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginOpen(false)
          setIsRegisterOpen(true)
        }}
      />

      {/* Register Modal */}
      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={(user) => {
          handleLogin({
            userId: 0,
            username: user.username,
            email: user.email,
          })
        }}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false)
          setIsLoginOpen(true)
        }}
      />

      {/* Checkout Modal */}
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={getTotalPrice()}
        onOrderComplete={handleOrderComplete}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
