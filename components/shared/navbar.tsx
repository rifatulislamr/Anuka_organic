'use client'

import { useState } from 'react'
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
}

const categories = [
  'Fresh Produce',
  'Dairy Products',
  'Meat & Poultry',
  'Spices & Condiments',
  'Grains & Cereals',
  'Beverages',
  'Snacks & Sweets',
  'Health & Wellness',
]

const categorySubmenus = {
  'Fresh Produce': [
    { name: 'Organic Vegetables', count: 45 },
    { name: 'Fresh Fruits', count: 32 },
    { name: 'Leafy Greens', count: 18 },
    { name: 'Herbs', count: 12 },
  ],
  'Dairy Products': [
    { name: 'Organic Milk', count: 8 },
    { name: 'Cheese', count: 15 },
    { name: 'Yogurt', count: 12 },
    { name: 'Butter & Ghee', count: 6 },
  ],
  'Meat & Poultry': [
    { name: 'Organic Chicken', count: 12 },
    { name: 'Free-Range Eggs', count: 8 },
    { name: 'Grass-Fed Beef', count: 6 },
    { name: 'Wild-Caught Fish', count: 10 },
  ],
  'Spices & Condiments': [
    { name: 'Whole Spices', count: 25 },
    { name: 'Ground Spices', count: 30 },
    { name: 'Organic Sauces', count: 15 },
    { name: 'Natural Sweeteners', count: 8 },
  ],
  'Grains & Cereals': [
    { name: 'Organic Rice', count: 12 },
    { name: 'Ancient Grains', count: 8 },
    { name: 'Breakfast Cereals', count: 15 },
    { name: 'Flour & Baking', count: 10 },
  ],
  Beverages: [
    { name: 'Herbal Teas', count: 20 },
    { name: 'Fresh Juices', count: 12 },
    { name: 'Organic Coffee', count: 8 },
    { name: 'Natural Drinks', count: 15 },
  ],
  'Snacks & Sweets': [
    { name: 'Healthy Snacks', count: 18 },
    { name: 'Organic Sweets', count: 12 },
    { name: 'Nuts & Seeds', count: 15 },
    { name: 'Dried Fruits', count: 10 },
  ],
  'Health & Wellness': [
    { name: 'Supplements', count: 25 },
    { name: 'Superfoods', count: 18 },
    { name: 'Natural Remedies', count: 12 },
    { name: 'Essential Oils', count: 8 },
  ],
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
}: NavbarProps) {
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

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
                <Image
                  height={48}
                  width={48}
                  src="/anuka-organic-logo.jpg"
                  alt="Anuka Organic Logo"
                  className="w-12 h-12 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-green-700">
                    Anuka
                  </span>
                  <span className="text-sm font-medium text-green-600 -mt-1">
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
                    className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onMouseLeave={() => {
                      setIsBrowseOpen(false)
                      setHoveredCategory(null)
                    }}
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="relative"
                        onMouseEnter={() => setHoveredCategory(category)}
                      >
                        <div className="flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0">
                          <span className="text-gray-700 hover:text-green-600 font-medium">
                            {category}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Subcategories Side Menu */}
                        {hoveredCategory === category && (
                          <div className="absolute left-full top-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ml-1">
                            <div className="p-2">
                              <h4 className="text-sm font-semibold text-gray-800 px-3 py-2 border-b border-gray-100 mb-2">
                                {category}
                              </h4>
                              {categorySubmenus[
                                category as keyof typeof categorySubmenus
                              ]?.map((subcategory) => (
                                <div
                                  key={subcategory.name}
                                  className="flex items-center justify-between px-3 py-2 hover:bg-green-50 cursor-pointer transition-colors rounded"
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
                        )}
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
              {/* <DropdownMenu open={open} onOpenChange={setOpen}>
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
                      <DropdownMenuItem
                        onClick={() => router.push('/orders')}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">My Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push('/profile')}
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                      >
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">My Profile</span>
                      </DropdownMenuItem>
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
              </DropdownMenu> */}
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

                      {/* If roleId = 1 → Admin Dashboard */}
                      {roleId === 1 && (
                        <DropdownMenuItem
                          onClick={() => router.push('/admin-dashboard')}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">Admin Dashboard</span>
                        </DropdownMenuItem>
                      )}

                      {/* If roleId = 2 → User menu */}
                      {roleId === 2 && (
                        <DropdownMenuItem
                          onClick={() => router.push('/user-dashboard')}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">My Dashboard</span>
                        </DropdownMenuItem>
                      )}

                      {/* Logout (for all logged-in users) */}
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
