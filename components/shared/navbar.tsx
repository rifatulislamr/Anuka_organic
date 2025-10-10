'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'

import { fetchProducts } from '@/api/product-api'
import { useAtom } from 'jotai'
import { tokenAtom } from '@/utils/user'
import { GetCategory, GetProduct } from '@/utils/type'
import { fetchCategories } from '@/api/categories-api'

interface NavbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredProducts: any[]
  isLoggedIn: boolean
  currentUser: string
  setIsLoginOpen: (open: boolean) => void
  setIsRegisterOpen: (open: boolean) => void
  handleLogout: () => void
  setIsCartOpen: (open: boolean) => void
  getTotalItems: () => number
  roleId: number | null
  onCategoryClick?: (categoryId: number) => void
  onProductClick?: (productId: number) => void
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  filteredProducts,
  isLoggedIn,
  currentUser,
  setIsLoginOpen,
  setIsRegisterOpen,
  handleLogout,
  setIsCartOpen,
  getTotalItems,
  roleId,
  onCategoryClick,
  onProductClick,
}: NavbarProps) {
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<GetCategory[]>([])
  const [products, setProducts] = useState<GetProduct[]>([])
  const [categorySubmenus, setCategorySubmenus] = useState<
    Record<string, { id: number; name: string; count: number }[]>
  >({})
  const [token] = useAtom(tokenAtom)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      if (!token) return
      try {
        const [catRes, prodRes] = await Promise.all([
          fetchCategories(token),
          fetchProducts(token),
        ])

        if (catRes?.data) setCategories(catRes.data)
        if (prodRes?.data) setProducts(prodRes.data)

        // Group products by category
        if (catRes?.data && prodRes?.data) {
          const categoryMap: Record<
            string,
            { id: number; name: string; count: number }[]
          > = {}

          catRes.data.forEach((cat: GetCategory) => {
            const subProducts =
              prodRes.data?.filter(
                (p: GetProduct) => p.categoryId === cat.id
              ) || []

            categoryMap[cat.name] = subProducts.map((sp: GetProduct) => ({
              id: sp.id, // This is the product ID
              name: sp.name,
              count: sp.stock || 0,
            }))
          })

          setCategorySubmenus(categoryMap)
        }
      } catch (error) {
        console.error('Failed to load categories/products:', error)
      }
    }

    loadData()
  }, [token])

  const handleCategoryClick = (categoryId: number) => {
    setIsBrowseOpen(false)
    setHoveredCategory(null)
    if (onCategoryClick) {
      onCategoryClick(categoryId)
    }
  }

  const handleSubProductClick = (productId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent event bubbling
    }
    setIsBrowseOpen(false)
    setHoveredCategory(null)
    if (onProductClick) {
      onProductClick(productId)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Browse Categories */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <Image
                    src="/logo.jpg" // ✅ replace with your image path
                    alt="Anuka Logo"
                    width={120}
                    height={100}
                    className="object-contain rounded-full"
                  />
                  <span className="text-base font-medium text-green-600 ml-6 mt-1.5">
                    ORGANIC
                  </span>
                </div>
              </Link>

              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 font-medium transition-colors px-3 py-2"
                  onMouseEnter={() => setIsBrowseOpen(true)}
                >
                  <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Browse Categories
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Main Categories Dropdown */}
                {isBrowseOpen && (
                  <div
                    className=" absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onMouseLeave={() => {
                      setIsBrowseOpen(false)
                      setHoveredCategory(null)
                    }}
                  >
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="relative"
                        onMouseEnter={() => setHoveredCategory(category.name)}
                      >
                        <div
                          className="flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <span className="text-gray-700 hover:text-green-600 font-medium">
                            {category.name}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Subcategories Side Menu */}
                        {/* {hoveredCategory === category.name && (
                          <div className=" overflow-y-scroll max-h-[60vh] absolute left-full top-0 min-w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ml-0">
                            <div className="p-2">
                              <h4 className="text-sm font-semibold text-gray-800 px-3 py-2 border-b border-gray-100 mb-2">
                                {category.name}
                              </h4>
                              {categorySubmenus[
                                category.name
                              ]?.map((subcategory, index) => (
                                <div
                                  key={`${category.name}-${subcategory.id}-${index}`}
                                  className="flex items-center justify-between px-3 py-2 hover:bg-green-50 cursor-pointer transition-colors rounded"
                                  onClick={(e) => handleSubProductClick(subcategory.id, e)}
                                >
                                  <span className="text-gray-600 hover:text-green-600 text-sm">
                                    {subcategory.name}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    ({subcategory.count})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )} */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for organic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 p-2 text-sm text-gray-600">
                    Found {filteredProducts.length} products matching{' '}
                    {searchQuery}
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all duration-200"
                    onMouseEnter={() => setOpen(true)}
                  >
                    <User className="w-5 h-5" />
                    {isLoggedIn && (
                      <span className="hidden sm:block text-sm font-medium">
                        Hi, {currentUser}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                  align="end"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  {!isLoggedIn ? (
                    <>
                      <DropdownMenuItem
                        onClick={() => setIsLoginOpen(true)}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                      >
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Log In</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setIsRegisterOpen(true)}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                      >
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Register</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-2 border-b border-gray-100 mb-2">
                        <p className="text-sm font-medium text-gray-900">
                          Welcome back!
                        </p>
                        <p className="text-xs text-gray-600">{currentUser}</p>
                      </div>

                      {roleId === 1 && (
                        <DropdownMenuItem
                          onClick={() => router.push('/admin-dashboard')}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">Admin Dashboard</span>
                        </DropdownMenuItem>
                      )}

                      {roleId === 2 && (
                        <DropdownMenuItem
                          onClick={() => router.push('/user-dashboard')}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">My Dashboard</span>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-red-700">Logout</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 hover:text-green-600"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
