import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-4">
              <Image
                height={40}
                width={40}
                src="/anuka-organic-logo.jpg"
                alt="Anuka Organic Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-green-700">Anuka</span>
                <span className="text-xs font-medium text-green-600 -mt-1">ORGANIC</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your trusted partner for 100% natural and organic products delivered fresh to your doorstep.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-green-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-green-600">
                  Fresh Produce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Dairy Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Meat & Poultry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Spices & Condiments
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Organic Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@anukaorganic.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Anuka Organic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
