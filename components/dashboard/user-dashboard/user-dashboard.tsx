'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './pages/Sidebar'
import CartsPage from './pages/CartsPage'
import OrdersPage from './pages/OrdersPage'
import ProfilePage from './pages/ProfilePage'
import { getUserByIdApi } from '@/api/users-api'
import { useAtom } from 'jotai'
import { tokenAtom } from '@/utils/user'

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
  const [user, setUser] = useState<User | null>(null)
  const [token] = useAtom(tokenAtom)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    const storedUser = localStorage.getItem('currentUser')
    if (!storedUser) return

    const parsedUser = JSON.parse(storedUser)
    const userId = parsedUser?.userId

    try {
      const response = await getUserByIdApi(token, userId)
      if (response?.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [token]) // ✅ depends on token

  useEffect(() => {
    fetchUser()
  }, [fetchUser, token])

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <ProfilePage user={user} />
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
          className="mb-6 flex items-center text-green-600 hover:text-green-800 transition-colors"
        >
          Back to Home
        </button>
        {renderPage()}
      </main>
    </div>
  )
}

export default UserDashboard
