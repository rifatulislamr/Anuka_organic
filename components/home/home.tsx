'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import Image from 'next/image'
import SignIn, { UserType } from './login-form'
import RegisterForm from './register-form'
import CheckoutForm from './checkout-form'
import HeroSlider from './hero-slider'
import Footer from '../shared/footer'
import ProductCard from '../product/product-card'
import ProductDetails from '../product/product-details'
import Navbar from '../shared/navbar'
import { fetchProducts } from '@/api/product-api'
import { fetchCategories } from '@/api/categories-api'
import { createCart, fetchCarts, deleteCart } from '@/api/cart-api'
import { useToast } from '@/hooks/use-toast'

import { useAtom } from 'jotai'
import { tokenAtom, useInitializeUser, userDataAtom } from '@/utils/user'
import { GetProduct, GetCategory, GetCart } from '@/utils/type'
import { createOrderApi } from '@/api/orders-api'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  useInitializeUser()
  const [token] = useAtom(tokenAtom)
  const [userData] = useAtom(userDataAtom)
  const { toast } = useToast()
  const [products, setProducts] = useState<GetProduct[]>([])
  const [categories, setCategories] = useState<GetCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [cartItems, setCartItems] = useState<GetCart[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [roleId, setRoleId] = useState<number | null>(null)
  const [savedRoleId, setSavedRoleId] = useState<number | null>(null)

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState<GetProduct | null>(
    null
  )
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  // Pagination state for categories
  const [categoryLimits, setCategoryLimits] = useState<Record<number, number>>(
    {}
  )
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({})

  // Fetch categories
  const getCategories = useCallback(async () => {
    try {
      const res = await fetchCategories(token)
      setCategories(res.data ?? [])
    } catch (err) {
      console.error(err)
      setError('Failed to load categories')
    }
  }, [token])

  // Fetch products
  const getProducts = useCallback(async () => {
    try {
      const res = await fetchProducts(token)
      setProducts(res.data ?? [])
    } catch (err) {
      console.error(err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [token])

  // Fetch user cart from DB
  const loadUserCart = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetchCarts(token)
      setCartItems(res.data ?? [])
    } catch (err) {
      console.error(err)
    }
  }, [token])

  useEffect(() => {
    getCategories()
    getProducts()
    loadUserCart()
  }, [getCategories, getProducts, loadUserCart])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categories
        .find((cat) => cat.id === product.categoryId)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase())
  )

  // Add to cart function
  const addToCart = async (product: GetProduct) => {
    if (!token) {
      toast({
        title: 'Login Required',
        description: 'Please login to add items to cart.',
        variant: 'destructive',
      })
      return
    }

    try {
      console.log('Adding product to cart:', product.id)

      const response = await createCart(token, { productId: product.id })

      console.log('Cart response:', response)

      if (response?.data) {
        // Show success message
        const message =
          response.data.message || 'Product added to cart successfully!'
        toast({
          title: 'Success',
          description: message,
        })

        // Reload cart from database
        await loadUserCart()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add product to cart.',
          variant: 'destructive',
        })
      }
    } catch (err: any) {
      console.error('Failed to add to cart:', err)

      // Show more detailed error message
      toast({
        title: 'Error',
        description:
          err.message || 'Failed to add product to cart. Please try again.',
        variant: 'destructive',
      })
    }
  }

  // Update quantity in cart - using addToCart for increment and deleteCart for decrement
  const updateQuantity = async (productId: number, change: number) => {
    if (!token) return

    const cartItem = cartItems.find((item) => item.productId === productId)
    const product = products.find((p) => p.id === productId)

    if (!cartItem || !product) return

    try {
      if (change > 0) {
        // For increment (+), call the addToCart API
        await createCart(token, { productId: product.id })
        // Reload cart from database to get updated quantity
        await loadUserCart()
      } else {
        // For decrement (-), call the deleteCart API
        const response = await deleteCart(token, productId)

        console.log('Delete cart response:', response)

        if (response?.data) {
          // Reload cart from database to get updated quantity or removed item
          await loadUserCart()
        } else {
          toast({
            title: 'Error',
            description: 'Failed to update cart.',
            variant: 'destructive',
          })
        }
      }
    } catch (err: any) {
      console.error('Failed to update cart:', err)

      // Show more detailed error message
      toast({
        title: 'Error',
        description: err.message || 'Failed to update cart. Please try again.',
        variant: 'destructive',
      })
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

  const openProductModal = (product: GetProduct) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  const handleViewAll = (categoryId: number) => {
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }))
    setCategoryLimits((prev) => ({ ...prev, [categoryId]: 12 }))
  }

  const handleSeeMore = (categoryId: number) => {
    setCategoryLimits((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 12) + 12,
    }))
  }

  const handleLogin = async (user: UserType) => {
    setIsLoggedIn(true)
    setCurrentUser(user.username)
    setRoleId(user.roleId ?? 0)
    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('roleId', String(user.roleId ?? 0))
    setSavedRoleId(user.roleId ?? 0)
    await loadUserCart() // Load cart after login
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser')
      const storedRoleId = localStorage.getItem('roleId')

      if (savedUser) {
        const parsedUser: UserType = JSON.parse(savedUser)
        setIsLoggedIn(true)
        setCurrentUser(parsedUser.username)
        setRoleId(parsedUser.roleId ?? 0)
      }

      if (storedRoleId) {
        setSavedRoleId(parseInt(storedRoleId))
      }
    }
  }, [])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
    setRoleId(null)
    setSavedRoleId(null)
    setCartItems([]) // Clear cart items on logout
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('roleId')
  }

  const handleOrderComplete = async () => {
    if (!token || !userData?.userId) {
      toast({
        title: 'Login Required',
        description: 'Please login to place an order.',
        variant: 'destructive',
      })
      return
    }

    if (cartItems.length === 0) {
      toast({
        title: 'Empty Cart',
        description: 'Your cart is empty.',
        variant: 'destructive',
      })
      return
    }

    try {
      // Transform cart items to match API format
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
      }))

      // Create order using the API
      const response = await createOrderApi(token, {
        userId: userData.userId,
        items: orderItems,
      })

      if (response?.data) {
        // Delete all cart items one by one if backend doesn't handle it
        try {
          for (const item of cartItems) {
            await deleteCart(token, item.productId)
          }
        } catch (deleteErr) {
          console.error('Error clearing cart:', deleteErr)
        }

        // Clear cart after successful order
        setCartItems([])

        // Close checkout modal
        setIsCheckoutOpen(false)

        // Show success message with total amount
        toast({
          title: 'Order Placed Successfully!',
          description: `Total Amount: ৳${response.data.totalOrderAmount || getTotalPrice()}. You will receive a confirmation call shortly.`,
        })

        // Reload cart from database (should be empty now)
        await loadUserCart()
      } else {
        toast({
          title: 'Order Failed',
          description: 'Failed to place order. Please try again.',
          variant: 'destructive',
        })
      }
    } catch (err: any) {
      console.error('Failed to create order:', err)

      // Show detailed error message
      toast({
        title: 'Order Failed',
        description: err.message || 'Failed to place order. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

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
        roleId={savedRoleId ?? roleId}
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
                product={{
                  ...product,
                  url: product.url.startsWith('http')
                    ? product.url
                    : `http://localhost:4000/${product.url}`,
                }}
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
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.categoryId === category.id
            )

            const isExpanded = expandedCategories[category.id]
            const currentLimit = categoryLimits[category.id] || 4
            const displayedProducts = isExpanded
              ? categoryProducts.slice(0, currentLimit)
              : categoryProducts.slice(0, 4)
            const hasMore = categoryProducts.length > currentLimit

            return (
              <section
                key={category.id}
                id={category.name.toLowerCase().replace(/\s+/g, '-')}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.name}
                  </h2>
                  {!isExpanded && categoryProducts.length > 4 && (
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                      onClick={() => handleViewAll(category.id)}
                    >
                      View All
                    </Button>
                  )}
                </div>

                {categoryProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {displayedProducts.map((product: GetProduct) => (
                        <ProductCard
                          key={product.id}
                          product={{
                            ...product,
                            url: product.url.startsWith('http')
                              ? product.url
                              : `http://localhost:4000/${product.url}`,
                          }}
                          onProductClick={openProductModal}
                          onAddToCart={addToCart}
                        />
                      ))}
                    </div>

                    {isExpanded && hasMore && (
                      <div className="flex justify-center mt-8">
                        <Button
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white bg-transparent px-8"
                          onClick={() => handleSeeMore(category.id)}
                        >
                          See More
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">
                    No products found in this category.
                  </p>
                )}
              </section>
            )
          })}
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
                      key={item.productId}
                      className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <Image
                        height={64}
                        width={64}
                        src={
                          item.url?.startsWith('http')
                            ? item.url
                            : `http://localhost:4000/${item.url}`
                        }
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-green-600 font-semibold">
                          ৳{item.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.productId, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.productId, 1)}
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
        onRegister={(user) =>
          handleLogin({ userId: 0, username: user.username, email: user.email })
        }
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

      {/* Toaster for notifications */}
      <Toaster />
    </div>
  )
}
