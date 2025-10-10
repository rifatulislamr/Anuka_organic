


// 'use client'

// import React, { useState } from 'react'
// import { updateUserApi } from '@/api/users-api'
// import { useAtom } from 'jotai'
// import { tokenAtom } from '@/utils/user'
// import { Users } from '@/utils/type'

// type ProfilePageProps = {
//   user: Users | null
//   onUserUpdate?: (updatedUser: Users) => void
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdate }) => {
//   const [token] = useAtom(tokenAtom)
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState<Partial<Users>>(user || {})
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState<string | null>(null)

//   if (!user || !formData || Object.keys(formData).length === 0) {
//     return (
//       <p className="text-center text-gray-500 mt-10">No user info found.</p>
//     )
//   }

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
//     if (!formData?.userId || !token) return
//     setLoading(true)
//     setMessage(null)
//     try {
//       // ✅ FIXED: Ensure all fields are explicitly null instead of undefined
//       const updateData = {
//         fullName: formData.fullName || null,
//         phone: formData.phone || null,
//         street: formData.street || null,
//         city: formData.city || null,
//         state: formData.state || null,
//         country: formData.country || null,
//         postalCode: formData.postalCode || null,
//       }

//       console.log('Sending update data:', updateData) // ✅ Debug log

//       const res = await updateUserApi(token, formData.userId, updateData)

//       if (res?.data) {
//         setMessage('✅ Profile updated successfully!')
//         setIsEditing(false)
//         setFormData(res.data)
        
//         // Call parent callback to update user state
//         if (onUserUpdate) {
//           onUserUpdate(res.data)
//         }
//       }
//     } catch (error: any) {
//       console.error('Update error:', error)
//       // ✅ FIXED: Better error handling to show backend message
//       const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update profile. Please try again.'
//       setMessage(`❌ ${errorMessage}`)
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
//             <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-5xl font-semibold shadow-lg">
//               {(formData.fullName ?? formData.username)?.charAt(0).toUpperCase()}
//             </div>
//             <h2 className="mt-4 text-2xl font-semibold text-gray-900">
//               {formData.fullName ?? 'N/A'}
//             </h2>
//             <p className="text-gray-500 text-sm">@{formData.username}</p>
//           </div>

//           {/* Info */}
//           <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Username</p>
//                 <p className="text-gray-900 font-medium">{formData.username}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Full Name</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.fullName ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Phone</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.phone ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Street</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="street"
//                     value={formData.street ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.street ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">City</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.city ?? 'N/A'}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
//                 <p className="text-gray-900 font-medium">{formData.email}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">State</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.state ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Country</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.country ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Postal Code</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={formData.postalCode ?? ''}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   <p className="text-gray-900 font-medium">
//                     {formData.postalCode ?? 'N/A'}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">Role</p>
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
//                 <p className="text-gray-500 text-sm font-medium mb-1">Status</p>
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
//                 <p className="text-gray-500 text-sm font-medium mb-1">Member Since</p>
//                 <p className="text-gray-900 font-medium">
//                   {formData.createdAt 
//                     ? new Date(formData.createdAt).toLocaleDateString()
//                     : 'N/A'}
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
//                 disabled={loading}
//                 className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium text-gray-700 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white disabled:opacity-50"
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
//           <div className={`text-center py-3 text-sm font-medium ${
//             message.includes('✅') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
//           }`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ProfilePage

'use client'

import React, { useState, useEffect } from 'react'
import { updateUserApi } from '@/api/users-api'
import { useAtom } from 'jotai'
import { tokenAtom } from '@/utils/user'
import { Users } from '@/utils/type'

type ProfilePageProps = {
  user: Users | null
  onUserUpdate?: (updatedUser: Users) => void
  onRefresh?: () => void // ✅ Add refresh callback
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdate, onRefresh }) => {
  const [token] = useAtom(tokenAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Users>>(user || {})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // ✅ Update formData when user prop changes
  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  if (!user || !formData || Object.keys(formData).length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No user info found.</p>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData(user)
    setMessage(null)
  }

  const handleSave = async () => {
    if (!formData?.userId || !token) return
    setLoading(true)
    setMessage(null)
    try {
      const updateData = {
        fullName: formData.fullName || null,
        phone: formData.phone || null,
        street: formData.street || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        postalCode: formData.postalCode || null,
      }

      console.log('Sending update data:', updateData)

      const res = await updateUserApi(token, formData.userId, updateData)

      if (res?.data) {
        setMessage('✅ Profile updated successfully!')
        setIsEditing(false)
        
        // ✅ FIXED: Call refresh to fetch fresh data from server
        if (onRefresh) {
          await onRefresh()
        } else if (onUserUpdate) {
          onUserUpdate(res.data)
        }
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setMessage(null), 3000)
      }
    } catch (error: any) {
      console.error('Update error:', error)
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update profile. Please try again.'
      setMessage(`❌ ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">
        My Profile
      </h1>

      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        <div className="md:flex md:space-x-10 p-6 md:p-10">
          {/* Avatar */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 mb-6 md:mb-0">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-5xl font-semibold shadow-lg">
              {(formData.fullName ?? formData.username)?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              {formData.fullName ?? 'N/A'}
            </h2>
            <p className="text-gray-500 text-sm">@{formData.username}</p>
          </div>

          {/* Info */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Username</p>
                <p className="text-gray-900 font-medium">{formData.username}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.fullName ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Phone</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.phone ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Street</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="street"
                    value={formData.street ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.street ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">City</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.city ?? 'N/A'}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
                <p className="text-gray-900 font-medium">{formData.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">State</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.state ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Country</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData.country ?? 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Postal Code</p>
                 
                  
              
                  <p className="text-gray-900 font-medium">
                    {formData.postalCode ?? 'N/A'}
                  </p>
                
              </div>

              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Role</p>
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
                <p className="text-gray-500 text-sm font-medium mb-1">Status</p>
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
                <p className="text-gray-500 text-sm font-medium mb-1">Member Since</p>
                <p className="text-gray-900 font-medium">
                  {formData.createdAt 
                    ? new Date(formData.createdAt).toLocaleDateString()
                    : 'N/A'}
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
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium text-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white disabled:opacity-50"
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
          <div className={`text-center py-3 text-sm font-medium ${
            message.includes('✅') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage