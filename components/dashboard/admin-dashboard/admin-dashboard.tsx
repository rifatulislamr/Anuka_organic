// 'use client'

// import { getUsers } from '@/api/users-api'
// import { User } from '@/utils/type'
// import { tokenAtom, useInitializeUser } from '@/utils/user'
// import { useAtom } from 'jotai'
// import { useRouter } from 'next/navigation'
// import React, { useState, useEffect } from 'react'

// type AdminPage =
//   | 'users'
//   | 'roles'
//   | 'permissions'
//   | 'categories'
//   | 'products'
//   | 'orders'
//   | 'payments'
//   | 'reviews'
//   | 'carts'

// const AdminDashboard = () => {
//   useInitializeUser()

//   const [token] = useAtom(tokenAtom)
//   const router = useRouter()
//   const [activePage, setActivePage] = useState<AdminPage>('users')
//   const [users, setUsers] = useState<User[]>([])
//   const [loading, setLoading] = useState(true)

//   const menuItems: { key: AdminPage; label: string }[] = [
//     { key: 'users', label: 'Users' },
//     { key: 'roles', label: 'Roles' },
//     { key: 'permissions', label: 'Permissions' },
//     { key: 'categories', label: 'Categories' },
//     { key: 'products', label: 'Products' },
//     { key: 'orders', label: 'Orders' },
//     { key: 'payments', label: 'Payments' },
//     { key: 'reviews', label: 'Reviews' },
//     { key: 'carts', label: 'Carts' },
//   ]

//   useEffect(() => {
//     async function loadUsers() {
//       try {
//         const data = await getUsers(token)
//         setUsers(data.data || [])
//         console.log('Fetched users:', data.data || [])
//       } catch (error) {
//         console.error('Failed to fetch users:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadUsers()
//   }, [token])

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
//         <h2 className="text-xl font-bold text-blue-600 mb-6">
//           Admin Dashboard
//         </h2>

//         <nav className="flex flex-col space-y-2">
//           {menuItems.map((item) => (
//             <button
//               key={item.key}
//               onClick={() => setActivePage(item.key)}
//               className={`px-4 py-2 rounded-md text-left transition-colors ${
//                 activePage === item.key
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-700 hover:bg-blue-50'
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {activePage === 'users' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               {loading ? (
//                 <p>Loading users...</p>
//               ) : (
//                 <table className="w-full text-left border-collapse mt-4">
//                   <thead>
//                     <tr>
//                       <th className="border-b p-3">Username</th>
//                       <th className="border-b p-3">Email</th>
//                       <th className="border-b p-3">Role ID</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map((user) => (
//                       <tr key={user.userId} className="hover:bg-gray-50">
//                         <td className="p-3">{user.username}</td>
//                         <td className="p-3">{user.email}</td>
//                         <td
//                           className={`p-3 capitalize ${
//                             user.roleName?.toLowerCase() === 'admin'
//                               ? 'text-green-600 font-semibold'
//                               : user.roleName?.toLowerCase() === 'user'
//                                 ? 'text-blue-600 font-semibold'
//                                 : 'text-gray-700'
//                           }`}
//                         >
//                           {user.roleName}
//                         </td>
//                         <td className="p-3">{user.fullName}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </section>
//         )}

//         {/* Other sections unchanged */}
//         {activePage === 'roles' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Roles</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Define and assign roles to users.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'permissions' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Permissions</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Set permissions for each role.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'categories' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Categories</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Add, edit, or delete product categories.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'products' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Add, edit, or remove products.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'orders' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Track and update customer orders.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'payments' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Payments</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>View and verify payments.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'reviews' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Reviews</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Review user feedback on products.</p>
//             </div>
//           </section>
//         )}

//         {activePage === 'carts' && (
//           <section>
//             <h1 className="text-2xl font-semibold mb-4">Manage Carts</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//               <p>Check pending user carts.</p>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   )
// }

// export default AdminDashboard


'use client'

import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { tokenAtom, useInitializeUser } from '@/utils/user'

// ✅ Import all page components
import UsersPage from './pages/users-page'
import RolesPage from './pages/roles-page'
import PermissionsPage from './pages/permissions-page'
import CategoriesPage from './pages/categories-page'
import ProductsPage from './pages/products-page'
import OrdersPage from './pages/orders-page'
import PaymentsPage from './pages/payments-page'
import ReviewsPage from './pages/reviews-page'
import CartsPage from './pages/carts-page'

type AdminPage =
  | 'users'
  | 'roles'
  | 'permissions'
  | 'categories'
  | 'products'
  | 'orders'
  | 'payments'
  | 'reviews'
  | 'carts'

const AdminDashboard = () => {
  useInitializeUser()
  const [token] = useAtom(tokenAtom)
  const [activePage, setActivePage] = useState<AdminPage>('users')

  const menuItems: { key: AdminPage; label: string }[] = [
    { key: 'users', label: 'Users' },
    { key: 'roles', label: 'Roles' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'categories', label: 'Categories' },
    { key: 'products', label: 'Products' },
    { key: 'orders', label: 'Orders' },
    { key: 'payments', label: 'Payments' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'carts', label: 'Carts' },
  ]

  const renderPage = () => {
    switch (activePage) {
      case 'users':
        return <UsersPage token={token} />
      case 'roles':
        return <RolesPage />
      case 'permissions':
        return <PermissionsPage />
      case 'categories':
        return <CategoriesPage />
      case 'products':
        return <ProductsPage />
      case 'orders':
        return <OrdersPage />
      case 'payments':
        return <PaymentsPage />
      case 'reviews':
        return <ReviewsPage />
      case 'carts':
        return <CartsPage />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Dashboard</h2>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`px-4 py-2 rounded-md text-left transition-colors ${
                activePage === item.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderPage()}</main>
    </div>
  )
}

export default AdminDashboard
