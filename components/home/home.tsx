"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import Image from "next/image"
import ProductCard from "./product-card"
import ProductDetails from "./product-details"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import CheckoutForm from "./checkout-form"
import Navbar from "./navbar"
import HeroSlider from "./hero-slider"
import Footer from "./footer"
import SignIn from "./login-form"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const products: Product[] = [
    // Poultry & Meat
    {
      id: 1,
      name: "Fresh Chicken Breast",
      price: 450,
      originalPrice: 500,
      image: "/fresh-chicken-breast.jpg",
      category: "Poultry & Meat",
      rating: 4.5,
      inStock: true,
      description:
        "Premium quality fresh chicken breast, sourced from free-range farms. Perfect for grilling, roasting, or curry preparations.",
      features: ["Free-range", "Antibiotic-free", "Fresh daily", "High protein"],
      nutritionalInfo: "Protein: 31g per 100g, Fat: 3.6g per 100g, Calories: 165 per 100g",
    },
    {
      id: 2,
      name: "Mutton Curry Cut",
      price: 850,
      image: "/mutton-curry-cut.jpg",
      category: "Poultry & Meat",
      rating: 4.8,
      inStock: true,
      description:
        "Tender mutton pieces cut specially for curry preparations. Sourced from grass-fed goats for the best flavor and nutrition.",
      features: ["Grass-fed", "Tender cuts", "Curry ready", "Rich flavor"],
      nutritionalInfo: "Protein: 25g per 100g, Fat: 21g per 100g, Iron: 3.3mg per 100g",
    },
    {
      id: 3,
      name: "Fish Fillet",
      price: 380,
      image: "/fresh-fish-fillet.jpg",
      category: "Poultry & Meat",
      rating: 4.3,
      inStock: true,
      description:
        "Fresh fish fillets, cleaned and ready to cook. Rich in omega-3 fatty acids and high-quality protein.",
      features: ["Omega-3 rich", "Boneless", "Fresh catch", "Ready to cook"],
      nutritionalInfo: "Protein: 22g per 100g, Omega-3: 1.2g per 100g, Calories: 206 per 100g",
    },
    {
      id: 4,
      name: "Prawns Large",
      price: 650,
      image: "/large-prawns-seafood.jpg",
      category: "Poultry & Meat",
      rating: 4.6,
      inStock: true,
      description:
        "Large, fresh prawns perfect for curries, grills, and seafood preparations. Cleaned and deveined for convenience.",
      features: ["Large size", "Cleaned & deveined", "Fresh catch", "Versatile cooking"],
      nutritionalInfo: "Protein: 24g per 100g, Fat: 0.3g per 100g, Calories: 99 per 100g",
    },

    // New Arrivals
    {
      id: 5,
      name: "Organic Quinoa",
      price: 320,
      image: "/organic-quinoa-grains.jpg",
      category: "New Arrivals",
      rating: 4.4,
      inStock: true,
      description:
        "Premium organic quinoa, a complete protein superfood. Perfect for salads, bowls, and healthy meal preparations.",
      features: ["Complete protein", "Gluten-free", "Organic certified", "Superfood"],
      nutritionalInfo: "Protein: 14g per 100g, Fiber: 7g per 100g, Calories: 368 per 100g",
    },
    {
      id: 6,
      name: "Almond Butter",
      price: 480,
      image: "/almond-butter-jar.png",
      category: "New Arrivals",
      rating: 4.7,
      inStock: true,
      description:
        "Creamy almond butter made from 100% roasted almonds. No added sugar or preservatives, just pure almond goodness.",
      features: ["100% almonds", "No preservatives", "Creamy texture", "Rich in vitamin E"],
      nutritionalInfo: "Protein: 21g per 100g, Fat: 49g per 100g, Vitamin E: 25.6mg per 100g",
    },
    {
      id: 7,
      name: "Coconut Oil",
      price: 280,
      image: "/coconut-oil-bottle.png",
      category: "New Arrivals",
      rating: 4.5,
      inStock: true,
      description:
        "Cold-pressed virgin coconut oil with natural coconut aroma. Perfect for cooking, baking, and skincare.",
      features: ["Cold-pressed", "Virgin quality", "Multi-purpose", "Natural aroma"],
      nutritionalInfo: "Saturated fat: 82g per 100g, Medium-chain triglycerides: 65g per 100g",
    },
    {
      id: 8,
      name: "Green Tea",
      price: 180,
      image: "/green-tea-box.png",
      category: "New Arrivals",
      rating: 4.2,
      inStock: true,
      description:
        "Premium green tea leaves rich in antioxidants. Sourced from high-altitude tea gardens for the finest flavor.",
      features: ["High antioxidants", "Premium leaves", "High-altitude grown", "Natural flavor"],
      nutritionalInfo: "Antioxidants: High EGCG content, Caffeine: 25mg per cup, Calories: 2 per cup",
    },

    // Best Selling
    {
      id: 9,
      name: "Basmati Rice 5kg",
      price: 420,
      image: "/basmati-rice-bag.jpg",
      category: "Best Selling",
      rating: 4.9,
      inStock: true,
      description:
        "Premium aged basmati rice with extra-long grains and aromatic fragrance. Perfect for biryanis and pulao.",
      features: ["Extra-long grains", "Aged rice", "Aromatic", "Premium quality"],
      nutritionalInfo: "Carbohydrates: 78g per 100g, Protein: 7g per 100g, Calories: 345 per 100g",
    },
    {
      id: 10,
      name: "Ghee Pure",
      price: 680,
      image: "/pure-ghee-jar.jpg",
      category: "Best Selling",
      rating: 4.8,
      inStock: true,
      description: "Pure cow ghee made from fresh cream using traditional methods. Rich in vitamins A, D, E, and K.",
      features: ["Traditional method", "Pure cow ghee", "Rich in vitamins", "Golden color"],
      nutritionalInfo: "Fat: 99.8g per 100g, Vitamin A: 840mcg per 100g, Calories: 900 per 100g",
    },
    {
      id: 11,
      name: "Turmeric Powder",
      price: 120,
      image: "/turmeric-powder.png",
      category: "Best Selling",
      rating: 4.6,
      inStock: true,
      description:
        "Pure turmeric powder with high curcumin content. Known for its anti-inflammatory and antioxidant properties.",
      features: ["High curcumin", "Anti-inflammatory", "Pure powder", "Natural color"],
      nutritionalInfo: "Curcumin: 3-5%, Iron: 41.4mg per 100g, Calories: 354 per 100g",
    },
    {
      id: 12,
      name: "Red Chili Powder",
      price: 150,
      image: "/red-chili-powder.jpg",
      category: "Best Selling",
      rating: 4.7,
      inStock: true,
      description:
        "Vibrant red chili powder made from premium dried chilies. Adds perfect heat and color to your dishes.",
      features: ["Premium chilies", "Vibrant color", "Perfect heat", "Fine powder"],
      nutritionalInfo: "Capsaicin: High, Vitamin C: 144mg per 100g, Calories: 282 per 100g",
    },

    // Daily Needs
    {
      id: 13,
      name: "Fresh Milk 1L",
      price: 65,
      image: "/fresh-milk-bottle.jpg",
      category: "Daily Needs",
      rating: 4.3,
      inStock: true,
      description:
        "Fresh cow milk from local dairy farms. Rich in calcium, protein, and essential vitamins for daily nutrition.",
      features: ["Farm fresh", "Rich in calcium", "Daily nutrition", "Local sourced"],
      nutritionalInfo: "Protein: 3.4g per 100ml, Calcium: 113mg per 100ml, Calories: 42 per 100ml",
    },
    {
      id: 14,
      name: "Brown Bread",
      price: 45,
      image: "/brown-bread-loaf.jpg",
      category: "Daily Needs",
      rating: 4.1,
      inStock: true,
      description:
        "Wholesome brown bread made with whole wheat flour. High in fiber and perfect for healthy breakfast.",
      features: ["Whole wheat", "High fiber", "Healthy choice", "Fresh baked"],
      nutritionalInfo: "Fiber: 6g per 100g, Protein: 13g per 100g, Calories: 247 per 100g",
    },
    {
      id: 15,
      name: "Farm Eggs 12pcs",
      price: 85,
      image: "/farm-fresh-eggs.png",
      category: "Daily Needs",
      rating: 4.4,
      inStock: true,
      description:
        "Fresh farm eggs from free-range hens. Rich in protein and essential amino acids for daily nutrition.",
      features: ["Free-range hens", "Fresh daily", "High protein", "Natural feed"],
      nutritionalInfo: "Protein: 13g per egg, Fat: 11g per egg, Calories: 155 per egg",
    },
    {
      id: 16,
      name: "Yogurt 500g",
      price: 55,
      image: "/fresh-yogurt.jpg",
      category: "Daily Needs",
      rating: 4.2,
      inStock: true,
      description: "Fresh homemade-style yogurt with live cultures. Perfect for digestion and as a healthy snack.",
      features: ["Live cultures", "Homemade style", "Digestive health", "Creamy texture"],
      nutritionalInfo: "Protein: 10g per 100g, Probiotics: Live cultures, Calories: 59 per 100g",
    },

    // Signature Series
    {
      id: 17,
      name: "Anuka Special Masala",
      price: 280,
      image: "/special-masala-blend.jpg",
      category: "Signature Series",
      rating: 4.9,
      inStock: true,
      description:
        "Our signature spice blend with 15 carefully selected spices. Perfect for authentic Indian curries and dishes.",
      features: ["15 spice blend", "Signature recipe", "Authentic flavor", "Premium quality"],
      nutritionalInfo: "Mixed spices with balanced flavor profile, Rich in antioxidants",
    },
    {
      id: 18,
      name: "Premium Tea Blend",
      price: 350,
      image: "/premium-tea-blend.jpg",
      category: "Signature Series",
      rating: 4.8,
      inStock: true,
      description:
        "Exclusive tea blend combining the finest tea leaves from different regions. Rich aroma and perfect strength.",
      features: ["Multi-region blend", "Rich aroma", "Perfect strength", "Exclusive recipe"],
      nutritionalInfo: "Antioxidants: High, Caffeine: 40mg per cup, Natural flavor compounds",
    },
    {
      id: 19,
      name: "Artisan Honey",
      price: 420,
      image: "/artisan-honey-jar.jpg",
      category: "Signature Series",
      rating: 4.7,
      inStock: true,
      description:
        "Raw, unprocessed honey from wildflower meadows. Rich in enzymes, antioxidants, and natural sweetness.",
      features: ["Raw & unprocessed", "Wildflower source", "Rich in enzymes", "Natural sweetness"],
      nutritionalInfo: "Natural sugars: 82g per 100g, Antioxidants: High, Calories: 304 per 100g",
    },
    {
      id: 20,
      name: "Organic Jaggery",
      price: 180,
      image: "/organic-jaggery.jpg",
      category: "Signature Series",
      rating: 4.6,
      inStock: true,
      description: "Pure organic jaggery made from sugarcane juice. Natural sweetener rich in minerals and iron.",
      features: ["Organic certified", "Sugarcane source", "Rich in minerals", "Natural sweetener"],
      nutritionalInfo: "Iron: 11mg per 100g, Minerals: Calcium, Magnesium, Calories: 383 per 100g",
    },

    // Pickles & Chutney
    {
      id: 21,
      name: "Mango Pickle",
      price: 220,
      image: "/mango-pickle-jar.png",
      category: "Pickles & Chutney",
      rating: 4.5,
      inStock: true,
      description:
        "Traditional mango pickle made with raw mangoes and authentic spices. Tangy and spicy flavor that enhances any meal.",
      features: ["Traditional recipe", "Raw mangoes", "Authentic spices", "Tangy & spicy"],
      nutritionalInfo: "Vitamin C: High, Probiotics: Fermented, Spices: Traditional blend",
    },
    {
      id: 22,
      name: "Mint Chutney",
      price: 180,
      image: "/mint-chutney.jpg",
      category: "Pickles & Chutney",
      rating: 4.3,
      inStock: true,
      description:
        "Fresh mint chutney with coriander and green chilies. Perfect accompaniment for snacks and main dishes.",
      features: ["Fresh mint", "Green chilies", "Perfect accompaniment", "Fresh flavor"],
      nutritionalInfo: "Vitamin A: High, Antioxidants: Natural, Fresh herbs: Mint, coriander",
    },
    {
      id: 23,
      name: "Garlic Pickle",
      price: 200,
      image: "/garlic-pickle.jpg",
      category: "Pickles & Chutney",
      rating: 4.4,
      inStock: true,
      description: "Spicy garlic pickle with traditional spices. Known for its health benefits and bold flavor.",
      features: ["Spicy flavor", "Health benefits", "Traditional spices", "Bold taste"],
      nutritionalInfo: "Allicin: Natural compound, Antioxidants: High, Traditional spice blend",
    },
    {
      id: 24,
      name: "Tamarind Chutney",
      price: 160,
      image: "/tamarind-chutney.jpg",
      category: "Pickles & Chutney",
      rating: 4.2,
      inStock: true,
      description:
        "Sweet and tangy tamarind chutney perfect for chaats and snacks. Made with pure tamarind and jaggery.",
      features: ["Sweet & tangy", "Pure tamarind", "Jaggery sweetened", "Chaat perfect"],
      nutritionalInfo: "Vitamin C: High, Natural acids: Tartaric acid, Antioxidants: Natural",
    },
  ]

  const categories = [
    "Poultry & Meat",
    "New Arrivals",
    "Best Selling",
    "Daily Needs",
    "Signature Series",
    "Pickles & Chutney",
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
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

  const handleLogin = (username: string) => {
    setIsLoggedIn(true)
    setCurrentUser(username)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser("")
  }

  const handleOrderComplete = () => {
    setCartItems([])
    alert("Order placed successfully! You will receive a confirmation call shortly.")
  }

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

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
            <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
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
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
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
                    <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                      <Image
                        height={64}
                        width={64}
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-green-600 font-semibold">৳{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                  <span className="text-lg font-bold text-green-600">৳{getTotalPrice()}</span>
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

      <SignIn
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
       onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginOpen(false)
          setIsRegisterOpen(true)
        }}
      />

      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleLogin} // ✅ Corrected prop
        onSwitchToLogin={() => {
          setIsRegisterOpen(false)
          setIsLoginOpen(true)
        }}
      />

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








