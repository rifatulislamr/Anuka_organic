// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
// import { toast } from '@/hooks/use-toast'
// import { signIn } from '@/api/signin-api'


// export default function SignIn() {
//   const router = useRouter()
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setIsLoading(true)

//     if (!username || !password) {
//       setError('Please fill in all fields.')
//       setIsLoading(false)
//       return
//     }

//     try {
//       const response = await signIn({ username, password })
//       console.log('🚀 ~ handleSubmit ~ response:', response.data)

//       if (!response.data || !response.data.data.token) {
//         setError('Invalid credentials')
//         toast({
//           title: 'Error',
//           description: 'Wrong username/passwrod. Please Contact with Administrator',
//         })
//       } else {
//         // ✅ Store token in localStorage or cookies
//         localStorage.setItem('authToken', response.data.data.token)
//         localStorage.setItem('currentUser', JSON.stringify(response.data.data.user))
       

//         toast({
//           title: 'Success',
//           description: 'Successfully logged in',
//         })

//         router.push('/profile') // or your protected route
//       }
//     } catch (err: any) {
//       console.error('Login error:', err)
//       setError(err?.message || 'An unexpected error occurred')
//       toast({
//         title: 'Error',
//         description: err?.message || 'Failed to log in. Please try again.',
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <Card className="shadow-2xl w-[550px]">
//         <CardHeader>
//           <div className="flex justify-center mb-4">
//             <h2 className="text-3xl font-bold text-yellow-400 uppercase">
//               Ispahani Tea Limited
//             </h2>
//           </div>
//           <CardTitle className="text-2xl font-bold text-center capitalize">
//             Sign in to your account
//           </CardTitle>
//           <CardDescription className="text-center">
//             Enter your username and password to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="w-full px-8">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="hover:border-yellow-400 transition-colors duration-200 border-2"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="hover:border-yellow-400 transition-colors duration-200 border-2"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-0 h-full px-3 py-2"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOffIcon className="h-4 w-4" />
//                   ) : (
//                     <EyeIcon className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </div>
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <Button
//               type="submit"
//               className="w-full bg-yellow-400 mt-10 hover:bg-yellow-500 text-black"
//               variant="default"
//               disabled={isLoading}
//             >
//               <LockIcon className="mr-2 h-4 w-4" />
//               {isLoading ? 'Signing In...' : 'Sign In'}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-2">
//           <Link
//             href="/forgot-password"
//             className="text-sm text-center text-primary hover:underline"
//           >
//             Forgot your password?
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, User, Lock, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { signIn } from "@/api/signin-api"

type SignInProps = {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: any) => void
  onSwitchToRegister: () => void
}

export default function SignIn({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}: SignInProps) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Escape key closes modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!username || !password) {
      setError("Please fill in all fields.")
      setIsLoading(false)
      return
    }

    try {
      const response = await signIn({ username, password })
      console.log("🚀 ~ handleSubmit ~ response:", response.data)

      const token = response?.data?.data?.token
      const user = response?.data?.data?.user

      if (!token) {
        setError("Invalid credentials")
        toast({
          title: "Error",
          description: "Wrong username/password. Please contact Administrator",
        })
      } else {
        localStorage.setItem("authToken", token)
        localStorage.setItem("currentUser", JSON.stringify(user))

        toast({
          title: "Success",
          description: "Successfully logged in",
        })

        onLogin(user)
        onClose()
        router.push("/profile")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      const msg =
        typeof err === "string"
          ? err
          : typeof err?.message === "string"
          ? err.message
          : "An unexpected error occurred"
      setError(msg)
      toast({
        title: "Error",
        description: msg,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Sign in to your account</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
