// 'use client'

// import React, { useState, useEffect, useCallback } from 'react'
// import { useRouter } from 'next/navigation'
// import Sidebar from './pages/Sidebar'
// import CartsPage from './pages/CartsPage'
// import OrdersPage from './pages/OrdersPage'
// import ProfilePage from './pages/ProfilePage'
// import { getUserByIdApi } from '@/api/users-api'
// import { useAtom } from 'jotai'
// import { tokenAtom } from '@/utils/user'

// // ✅ User type
// export type User = {
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
//   role?: {
//     roleId: number
//     roleName: string
//     rolePermissions: {
//       roleId: number
//       permissionId: number
//       permission: { id: number; name: string }
//     }[]
//   } | null
// }

// const UserDashboard = () => {
//   const [activePage, setActivePage] = useState<'profile' | 'orders' | 'carts'>(
//     'profile'
//   )
//   const [user, setUser] = useState<User | null>(null)
//   const [token] = useAtom(tokenAtom)
//   const router = useRouter()

//   const fetchUser = useCallback(async () => {
//     const storedUser = localStorage.getItem('currentUser')
//     if (!storedUser) return

//     const parsedUser = JSON.parse(storedUser)
//     const userId = parsedUser?.userId

//     try {
//       const response = await getUserByIdApi(token, userId)
//       if (response?.data) {
//         setUser(response.data)
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error)
//     }
//   }, [token]) // ✅ depends on token

//   useEffect(() => {
//     fetchUser()
//   }, [fetchUser, token])

//   const renderPage = () => {
//     switch (activePage) {
//       case 'profile':
//         return <ProfilePage user={user} />
//       case 'orders':
//         return <OrdersPage />
//       case 'carts':
//         return <CartsPage />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />
//       <main className="flex-1 p-8 overflow-y-auto max-h-screen">
//         <button
//           onClick={() => router.push('/')}
//           className="mb-6 flex items-center text-green-600 hover:text-green-800 transition-colors"
//         >
//           Back to Home
//         </button>
//         {renderPage()}
//       </main>
//     </div>
//   )
// }

// export default UserDashboard

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './pages/Sidebar'
import CartsPage from './pages/CartsPage'
import OrdersPage from './pages/OrdersPage'
import ProfilePage from './pages/ProfilePage'
import { getUserByIdApi } from '@/api/users-api'
import { useAtom } from 'jotai'
import { tokenAtom, useInitializeUser, userDataAtom } from '@/utils/user'
import { Users } from '@/utils/type'

// ✅ User type
export type User = {
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
  role?: {
    roleId: number
    roleName: string
    rolePermissions: {
      roleId: number
      permissionId: number
      permission: { id: number; name: string }
    }[]
  } | null
}

const UserDashboard = () => {
  const [activePage, setActivePage] = useState<'profile' | 'orders' | 'carts'>(
    'profile'
  )
  const [user, setUser] = useState<Users | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token] = useAtom(tokenAtom)
  useInitializeUser()
  const [userData] = useAtom(userDataAtom)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    if (!userData?.userId || !token) {
      setLoading(false)
      setError('No user ID or token found. Please log in.')
      return
    }

    try {
      setLoading(true)
      const response = await getUserByIdApi(token, userData.userId)
      if (response?.data) {
        setUser(response.data)
        setError(null)
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError('Failed to load user data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [token, userData?.userId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const handleUserUpdate = (updatedUser: Users) => {
    setUser(updatedUser)
  }

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user data...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-700 text-center mb-4">{error}</p>
            <button
              onClick={fetchUser}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    switch (activePage) {
      case 'profile':
        return (
          <ProfilePage
            user={user}
            onUserUpdate={handleUserUpdate}
            onRefresh={fetchUser}
          />
        )
      case 'orders':
        return <OrdersPage />
      case 'carts':
        return <CartsPage />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>
        {renderPage()}
      </main>
    </div>
  )
}

export default UserDashboard
