

// 'use client'

// import React, { useState } from 'react'
// import { User } from '../user-dashboard'
// import { updateUserApi } from '@/api/users-api'
// import { useAtom } from 'jotai'
// import { tokenAtom } from '@/utils/user'

// type ProfilePageProps = {
//   user: User | null
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
//   const [token] = useAtom(tokenAtom)
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState<Partial<User>>(user || {})
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState<string | null>(null)

//   if (!user)
//     return (
//       <p className="text-center text-gray-500 mt-10">No user info found.</p>
//     )

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleCancel = () => {
//     setIsEditing(false)
//     setFormData(user)
//     setMessage(null)
//   }

//   const handleSave = async () => {
//     if (!user?.userId || !token) return
//     setLoading(true)
//     setMessage(null)
//     try {
//       const res = await updateUserApi(token, user.userId, formData as any)

//       if (res?.data) {
//         setMessage('✅ Profile updated successfully!')
//         setIsEditing(false)
//         setFormData(res.data)
//         localStorage.setItem('currentUser', JSON.stringify(res.data)) // optional
//       }
//     } catch (error) {
//       console.error(error)
//       setMessage('❌ Failed to update profile. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const address =
//     [
//       formData.street,
//       formData.city,
//       formData.state,
//       formData.country,
//       formData.postalCode,
//     ]
//       .filter(Boolean)
//       .join(', ') || 'N/A'

//   return (
//     <div className="max-w-5xl mx-auto mt-12 p-4 sm:p-6 lg:p-10">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">
//         My Profile
//       </h1>

//       <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="md:flex md:space-x-10 p-6 md:p-10">
//           {/* Avatar */}
//           <div className="flex flex-col items-center md:items-start md:w-1/3 mb-6 md:mb-0">
//             <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-6xl font-light">
//               {(formData.fullName ?? formData.username)?.charAt(0)}
//             </div>
//             <h2 className="mt-4 text-2xl font-semibold text-gray-900">
//               {formData.fullName ?? 'N/A'}
//             </h2>
//           </div>

//           {/* Info */}
//           <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm">Username</p>
//                 <p className="text-gray-900 font-medium">{formData.username}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Full Name</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName ?? ''}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.fullName ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Phone</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone ?? ''}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.phone ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">City</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city ?? ''}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">{address}</p>
//                 )}
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm">Email</p>
//                 <p className="text-gray-900 font-medium">{formData.email}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Role Name</p>
//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                     formData.roleName?.toLowerCase() === 'admin'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-blue-100 text-blue-800'
//                   }`}
//                 >
//                   {formData.roleName ?? 'N/A'}
//                 </span>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Active Status</p>
//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                     formData.active
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}
//                 >
//                   {formData.active ? 'Active' : 'Inactive'}
//                 </span>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Member Since</p>
//                 <p className="text-gray-900 font-medium">
//                   {new Date(formData.createdAt ?? '').toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleCancel}
//                 className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium text-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white"
//               >
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>

//         {message && (
//           <p className="text-center py-3 text-sm text-gray-700">{message}</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ProfilePage



'use client'

import React, { useState, useEffect } from 'react'
import { User } from '../user-dashboard'
import { updateUserApi } from '@/api/users-api'
import { useAtom } from 'jotai'
import { tokenAtom } from '@/utils/user'

type ProfilePageProps = {
  user: User | null
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [token] = useAtom(tokenAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>(user || {})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // ✅ Fix: Load user from localStorage if not provided
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setFormData(parsedUser)
      }
    }
  }, [user])

  if (!formData || Object.keys(formData).length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">No user info found.</p>
    )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData(user || formData)
    setMessage(null)
  }

  const handleSave = async () => {
    if (!formData?.userId || !token) return
    setLoading(true)
    setMessage(null)
    try {
      const res = await updateUserApi(token, formData.userId, formData as any)

      if (res?.data) {
        setMessage('✅ Profile updated successfully!')
        setIsEditing(false)
        setFormData(res.data)
        localStorage.setItem('currentUser', JSON.stringify(res.data))
      }
    } catch (error) {
      console.error(error)
      setMessage('❌ Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const address =
    [
      formData.street,
      formData.city,
      formData.state,
      formData.country,
      formData.postalCode,
    ]
      .filter(Boolean)
      .join(', ') || 'N/A'

  return (
    <div className="max-w-5xl mx-auto mt-12 p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">
        My Profile
      </h1>

      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        <div className="md:flex md:space-x-10 p-6 md:p-10">
          {/* Avatar */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 mb-6 md:mb-0">
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-6xl font-light">
              {(formData.fullName ?? formData.username)?.charAt(0)}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              {formData.fullName ?? 'N/A'}
            </h2>
          </div>

          {/* Info */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Username</p>
                <p className="text-gray-900 font-medium">{formData.username}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName ?? ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.fullName ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone ?? ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.phone ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm">City</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city ?? ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{address}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-900 font-medium">{formData.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Role Name</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    formData.roleName?.toLowerCase() === 'admin'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {formData.roleName ?? 'N/A'}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Active Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    formData.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {formData.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="text-gray-900 font-medium">
                  {new Date(formData.createdAt ?? '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white"
            >
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <p className="text-center py-3 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
