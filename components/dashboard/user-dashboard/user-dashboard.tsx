// "use client"

// import React, { useState, useEffect } from "react"

// // ✅ User type from backend
// type User = {
//   userId: number
//   username: string
//   email: string
//   password: string
//   active: boolean
//   roleId: number | null
//   roleName?: string | null
//   fullName: string | null
//   phone: string | null
//   street: string | null
//   city: string | null
//   state: string | null
//   country: string | null
//   postalCode: string | null
//   isPasswordResetRequired: boolean
//   createdAt: string
//   updatedAt: string
// }

// const UserDashboard = () => {
//   const [activePage, setActivePage] = useState<"profile" | "orders" | "payments">("profile")
//   const [user, setUser] = useState<User | null>(null)

//   // ✅ Load user from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser")
//     if (storedUser) {
//       try {
//         const parsedUser: User = JSON.parse(storedUser)
//         setUser(parsedUser)
//       } catch (err) {
//         console.error("Error parsing stored user:", err)
//       }
//     }
//   }, [])

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
//         <h2 className="text-xl font-bold text-green-600 mb-6">
//           User Dashboard
//         </h2>

//         <nav className="flex flex-col space-y-2">
//           <button
//             onClick={() => setActivePage("profile")}
//             className={`px-4 py-2 rounded-md text-left transition-colors ${
//               activePage === "profile"
//                 ? "bg-green-600 text-white"
//                 : "text-gray-700 hover:bg-green-50"
//             }`}
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActivePage("orders")}
//             className={`px-4 py-2 rounded-md text-left transition-colors ${
//               activePage === "orders"
//                 ? "bg-green-600 text-white"
//                 : "text-gray-700 hover:bg-green-50"
//             }`}
//           >
//             Orders
//           </button>
//           <button
//             onClick={() => setActivePage("payments")}
//             className={`px-4 py-2 rounded-md text-left transition-colors ${
//               activePage === "payments"
//                 ? "bg-green-600 text-white"
//                 : "text-gray-700 hover:bg-green-50"
//             }`}
//           >
//             Payments
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {/* PROFILE SECTION */}
//         {activePage === "profile" && (
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//               My Profile
//             </h1>
//             <div className="bg-white rounded-lg shadow p-6 space-y-3">
//               {user ? (
//                 <>

//                   <p className="capitalize"><span className="font-medium">Name:</span> {user.username}</p>
//                   <p><span className="font-medium">Full Name:</span> {user.fullName ?? "N/A"}</p>
//                   <p><span className="font-medium">Email:</span> {user.email}</p>
//                   <p><span className="font-medium">Phone:</span> {user.phone ?? "N/A"}</p>
//                   <p>
//                     <span className="font-medium">Address:</span>{" "}
//                     {[user.street, user.city, user.state, user.country, user.postalCode]
//                       .filter(Boolean)
//                       .join(", ") || "N/A"}
//                   </p>
//                   <p>
//                     <span className="font-medium">Role:</span>{" "}
//                     <span
//                       className={`capitalize ${
//                         user.roleName?.toLowerCase() === "admin"
//                           ? "text-green-600 font-semibold"
//                           : user.roleName?.toLowerCase() === "user"
//                           ? "text-blue-600 font-semibold"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {user.roleName ?? "N/A"}
//                     </span>
//                   </p>
//                   <p><span className="font-medium">Active:</span> {user.active ? "Yes" : "No"}</p>

//                 </>
//               ) : (
//                 <p>No user info found in localStorage.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ORDERS SECTION */}
//         {activePage === "orders" && (
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//               My Orders
//             </h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr>
//                     <th className="border-b p-3">Order ID</th>
//                     <th className="border-b p-3">Date</th>
//                     <th className="border-b p-3">Status</th>
//                     <th className="border-b p-3">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="hover:bg-gray-50">
//                     <td className="p-3">#1001</td>
//                     <td className="p-3">2025-09-15</td>
//                     <td className="p-3 text-green-600 font-medium">Delivered</td>
//                     <td className="p-3">$120</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="p-3">#1002</td>
//                     <td className="p-3">2025-09-20</td>
//                     <td className="p-3 text-yellow-600 font-medium">Pending</td>
//                     <td className="p-3">$75</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* PAYMENTS SECTION */}
//         {activePage === "payments" && (
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//               My Payments
//             </h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr>
//                     <th className="border-b p-3">Payment ID</th>
//                     <th className="border-b p-3">Date</th>
//                     <th className="border-b p-3">Method</th>
//                     <th className="border-b p-3">Status</th>
//                     <th className="border-b p-3">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="hover:bg-gray-50">
//                     <td className="p-3">#P5001</td>
//                     <td className="p-3">2025-09-18</td>
//                     <td className="p-3">bKash</td>
//                     <td className="p-3 text-green-600 font-medium">Paid</td>
//                     <td className="p-3">$50</td>
//                   </tr>
//                   <tr className="hover:bg-gray-50">
//                     <td className="p-3">#P5002</td>
//                     <td className="p-3">2025-09-22</td>
//                     <td className="p-3">Cash</td>
//                     <td className="p-3 text-yellow-600 font-medium">Pending</td>
//                     <td className="p-3">$80</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default UserDashboard

'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// ✅ User type from backend
type User = {
  userId: number
  username: string
  email: string
  password: string
  active: boolean
  roleId: number | null
  roleName?: string | null
  fullName: string | null
  phone: string | null
  street: string | null
  city: string | null
  state: string | null
  country: string | null
  postalCode: string | null
  isPasswordResetRequired: boolean
  createdAt: string
  updatedAt: string

  // ✅ Nested role object (from backend)
  role?: {
    roleId: number
    roleName: string
    rolePermissions: {
      roleId: number
      permissionId: number
      permission: {
        id: number
        name: string
      }
    }[]
  } | null
}

const UserDashboard = () => {
  const [activePage, setActivePage] = useState<
    'profile' | 'orders' | 'payments'
  >('profile')
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    console.log('Stored User:', storedUser) // Debugging log
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (err) {
        console.error('Error parsing stored user:', err)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-xl font-bold text-green-600 mb-6">
          User Dashboard
        </h2>

        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => setActivePage('profile')}
            className={`px-4 py-2 rounded-md text-left transition-colors ${
              activePage === 'profile'
                ? 'bg-green-600 text-white'
                : 'text-gray-700 hover:bg-green-50'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActivePage('orders')}
            className={`px-4 py-2 rounded-md text-left transition-colors ${
              activePage === 'orders'
                ? 'bg-green-600 text-white'
                : 'text-gray-700 hover:bg-green-50'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActivePage('payments')}
            className={`px-4 py-2 rounded-md text-left transition-colors ${
              activePage === 'payments'
                ? 'bg-green-600 text-white'
                : 'text-gray-700 hover:bg-green-50'
            }`}
          >
            Payments
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-green-600 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {/* PROFILE SECTION */}
        {activePage === 'profile' && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              My Profile
            </h1>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              {user ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Username:
                      </span>{' '}
                      {user.username}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Full Name:
                      </span>{' '}
                      {user.fullName ?? 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Email:
                      </span>{' '}
                      {user.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Phone:
                      </span>{' '}
                      {user.phone ?? 'N/A'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Address:
                      </span>{' '}
                      {[
                        user.street,
                        user.city,
                        user.state,
                        user.country,
                        user.postalCode,
                      ]
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">Role:</span>{' '}
                      <span
                        className={`capitalize ${
                          user.role?.roleName?.toLowerCase() === 'admin'
                            ? 'text-green-600 font-semibold'
                            : user.role?.roleName?.toLowerCase() === 'user'
                              ? 'text-blue-600 font-semibold'
                              : 'text-gray-700'
                        }`}
                      >
                        {user.role?.roleName ?? 'N/A'}
                      </span>
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Active:
                      </span>{' '}
                      {user.active ? 'Yes' : 'No'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Member Since:
                      </span>{' '}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No user info found in localStorage.</p>
              )}
            </div>
          </div>
        )}

        {/* ORDERS SECTION */}
        {activePage === 'orders' && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              My Orders
            </h1>
            <div className="bg-white rounded-lg shadow p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-3">Order ID</th>
                    <th className="border-b p-3">Date</th>
                    <th className="border-b p-3">Status</th>
                    <th className="border-b p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">#1001</td>
                    <td className="p-3">2025-09-15</td>
                    <td className="p-3 text-green-600 font-medium">
                      Delivered
                    </td>
                    <td className="p-3">$120</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">#1002</td>
                    <td className="p-3">2025-09-20</td>
                    <td className="p-3 text-yellow-600 font-medium">Pending</td>
                    <td className="p-3">$75</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS SECTION */}
        {activePage === 'payments' && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              My Payments
            </h1>
            <div className="bg-white rounded-lg shadow p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-3">Payment ID</th>
                    <th className="border-b p-3">Date</th>
                    <th className="border-b p-3">Method</th>
                    <th className="border-b p-3">Status</th>
                    <th className="border-b p-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">#P5001</td>
                    <td className="p-3">2025-09-18</td>
                    <td className="p-3">bKash</td>
                    <td className="p-3 text-green-600 font-medium">Paid</td>
                    <td className="p-3">$50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">#P5002</td>
                    <td className="p-3">2025-09-22</td>
                    <td className="p-3">Cash</td>
                    <td className="p-3 text-yellow-600 font-medium">Pending</td>
                    <td className="p-3">$80</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default UserDashboard
