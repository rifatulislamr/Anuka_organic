// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
//   MapPin,
//   Phone,
//   Mail,
// } from 'lucide-react'
// import Link from 'next/link'

// export default function Footer() {
//   return (
//     <footer className="bg-white border-t border-gray-200 mt-16">
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-3">
//               <div className="flex items-center space-x-3 mb-4">
//                 {/* <Image
//                 height={40}
//                 width={40}
//                 src="/anuka-organic-logo.jpg"
//                 alt="Anuka Organic Logo"
//                 className="w-10 h-10 object-contain"
//               /> */}
//                 <div className="flex flex-col">
//                   <span className=" font-bold text-green-700">
//                     জীবনের প্রয়োজনে । <span className="text-xl">Anuka</span>
//                   </span>
//                   {/* <span className="text-xs font-medium text-green-600 -mt-1">ORGANIC</span> */}
//                   {/* <span></span> */}
//                 </div>
//               </div>
//             </Link>
//             <div className="flex flex-col font-bold text-green-700 ">
//               <span>Morshed A. Chowdhury</span>
//               <span>Founder & CEO</span>
//             </div>
//             <div className="flex space-x-3 mt-10">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
//               >
//                 <Facebook className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
//               >
//                 <Twitter className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
//               >
//                 <Instagram className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
//               >
//                 <Youtube className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Terms of Service
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Fresh Produce
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Dairy Products
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Meat & Poultry
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-green-600">
//                   Spices & Condiments
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="w-8 h-8" />
//                 <span>
//                   House # 64, Road # 04, Block # B, Chandgaon Residential Area,
//                   Chittagong.
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Phone className="w-4 h-4" />
//                 <span>01333-727648</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="w-4 h-4" />
//                 <span>chowdhurymorshed602@gmail.com</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
//           <p>&copy; 2024 Anuka Organic. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 mb-4">
                {/* <Image
                height={40}
                width={40}
                src="/anuka-organic-logo.jpg"
                alt="Anuka Organic Logo"
                className="w-10 h-10 object-contain"
              /> */}
                <div className="flex flex-col">
                  <span className=" font-bold text-green-700">
                    জীবনের প্রয়োজনে । <span className="text-xl">Anuka</span>
                  </span>
                  {/* <span className="text-xs font-medium text-green-600 -mt-1">ORGANIC</span> */}
                  {/* <span></span> */}
                </div>
              </div>
            </Link>
            <div className="flex flex-col font-bold text-green-700 ">
              <span>Morshed A. Chowdhury</span>
              <span>Founder & CEO</span>
            </div>
            {/* <div className="flex space-x-3 mt-10">
              
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
                <Youtube className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
              >
                <FaWhatsapp className="w-4 h-4" />
              </Button>
            </div> */}
            <div className="flex space-x-3 mt-10">
              <a
                href="https://www.facebook.com/profile.php?id=100085063104502&rdid=e5CXKAwqn8wagcQd&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ANLjh6dh6%2F#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>

              <a
                href="https://www.youtube.com/" // replace with your actual YouTube link
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
              </a>

              <a
                href="https://wa.me/8801818127160"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </Button>
              </a>
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
                <MapPin className="w-8 h-8" />
                <span>
                  House # 64, Road # 04, Block # B, Chandgaon Residential Area,
                  Chittagong.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>01333-727648</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>chowdhurymorshed602@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Anuka Organic. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
