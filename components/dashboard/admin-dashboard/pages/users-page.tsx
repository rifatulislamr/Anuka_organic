'use client'

import React, { useEffect, useState } from 'react'
import { getUsers } from '@/api/users-api'
import { User } from '@/utils/type'

interface UsersPageProps {
  token: string
}

const UsersPage: React.FC<UsersPageProps> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsers(token)
        setUsers(res.data || [])
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [token])

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full text-left border-collapse mt-4">
            <thead>
              <tr>
                <th className="border-b p-3">Username</th>
                <th className="border-b p-3">Email</th>
                <th className="border-b p-3">Role</th>
                <th className="border-b p-3">Full Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td
                    className={`p-3 capitalize ${
                      user.roleName?.toLowerCase() === 'admin'
                        ? 'text-green-600 font-semibold'
                        : user.roleName?.toLowerCase() === 'user'
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-700'
                    }`}
                  >
                    {user.roleName}
                  </td>
                  <td className="p-3">{user.fullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

export default UsersPage
