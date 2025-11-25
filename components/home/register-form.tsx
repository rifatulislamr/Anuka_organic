'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from "next/navigation"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  X, User, Lock, Mail, Eye, EyeOff, Check, AlertCircle, Phone, MapPin
} from 'lucide-react'
import { RegisterRequestSchema } from '@/utils/type'
import { registerUser } from '@/api/signup-api'
import { getUsers } from '@/api/users-api'
import { UserType } from './login-form'
import { tokenAtom } from '@/utils/user'
import { toast } from "@/hooks/use-toast"

interface RegisterFormProps {
  isOpen: boolean
  onClose: () => void
  onRegister: (user: UserType) => void
  onSwitchToLogin: () => void
}

interface PasswordRequirement {
  text: string
  met: boolean
}

interface InputFieldProps {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  touched?: boolean
  valid?: boolean
  taken?: boolean
}

interface PasswordFieldProps {
  label: string
  value: string
  show: boolean
  setShow: (show: boolean) => void
  onChange: (v: string) => void
  touched?: boolean
  requirements?: PasswordRequirement[]
  passwordsMatch?: boolean
}

export default function RegisterForm({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}: RegisterFormProps) {
  const router = useRouter()
  const [token] = useAtom(tokenAtom)

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [existingUsers, setExistingUsers] = useState<any[]>([])
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
    { text: 'At least 8 characters long', met: false },
  ])

  const fetchUsers = useCallback(async () => {
    if (!isOpen) return
    try {
      setCheckingAvailability(true)
      const res = await getUsers(token || '')
      setExistingUsers(res.data || [])
    } catch (err) {
      console.error(err)
      setExistingUsers([])
    } finally {
      setCheckingAvailability(false)
    }
  }, [token, isOpen])

  useEffect(() => {
    if (isOpen) fetchUsers()
  }, [fetchUsers, isOpen])

  useEffect(() => {
    const password = formData.password
    setPasswordRequirements([
      { text: 'At least 8 characters long', met: password.length >= 8 },
    ])
  }, [formData.password])

  const allPasswordRequirementsMet = passwordRequirements.every(req => req.met)
  const passwordsMatch = formData.password === formData.confirmPassword

  const isUsernameTaken = (username: string) =>
    existingUsers.some(u => u.username?.toLowerCase() === username.toLowerCase())

  const isEmailTaken = (email: string) =>
    existingUsers.some(u => u.email?.toLowerCase() === email.toLowerCase())

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const isUsernameValid = (username: string) => username.length >= 3

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    if (!isUsernameValid(formData.username)) {
      setError('Username must be at least 3 characters long')
      return
    }
    if (isUsernameTaken(formData.username)) {
      setError('Username already taken')
      return
    }
    if (!isEmailValid(formData.email)) {
      setError('Invalid email')
      return
    }
    if (isEmailTaken(formData.email)) {
      setError('Email already registered')
      return
    }
    if (!allPasswordRequirementsMet) {
      setError('Password does not meet requirements')
      return
    }
    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const validatedData = RegisterRequestSchema.parse({
        ...formData,
        roleId: 2,
      })
      const response = await registerUser(validatedData)

      if (response.data?.status === 'success') {
        setSuccess('Account created successfully! Redirecting to login...')
        toast({
          title: "Success 🎉",
          description: `Welcome ${validatedData.username}!`,
          variant: "default",
        })
        setFormData({
          username: '',
          fullName: '',
          phone: '',
          street: '',
          city: '',
          state: '',
          country: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        setTimeout(() => {
          onClose()
          onSwitchToLogin()
        }, 2500)
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An error occurred')
      toast({
        title: "Error",
        description: err.message || 'An error occurred',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md md:max-w-3xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">Create New Account</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Username"
              icon={<User />}
              value={formData.username}
              onChange={v => handleInputChange('username', v)}
              onBlur={() => handleBlur('username')}
              touched={touched.username}
              valid={isUsernameValid(formData.username)}
              taken={isUsernameTaken(formData.username)}
            />
            <InputField
              label="Full Name"
              icon={<User />}
              value={formData.fullName}
              onChange={v => handleInputChange('fullName', v)}
              onBlur={() => handleBlur('fullName')}
              touched={touched.fullName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Phone"
              icon={<Phone />}
              value={formData.phone}
              onChange={v => handleInputChange('phone', v)}
              onBlur={() => handleBlur('phone')}
              touched={touched.phone}
            />
            <InputField
              label="Email"
              icon={<Mail />}
              value={formData.email}
              onChange={v => handleInputChange('email', v)}
              onBlur={() => handleBlur('email')}
              touched={touched.email}
              valid={isEmailValid(formData.email)}
              taken={isEmailTaken(formData.email)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Street"
              icon={<MapPin />}
              value={formData.street}
              onChange={v => handleInputChange('street', v)}
              onBlur={() => handleBlur('street')}
              touched={touched.street}
            />
            <InputField
              label="City"
              icon={<MapPin />}
              value={formData.city}
              onChange={v => handleInputChange('city', v)}
              onBlur={() => handleBlur('city')}
              touched={touched.city}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="State"
              icon={<MapPin />}
              value={formData.state}
              onChange={v => handleInputChange('state', v)}
              onBlur={() => handleBlur('state')}
              touched={touched.state}
            />
            <InputField
              label="Country"
              icon={<MapPin />}
              value={formData.country}
              onChange={v => handleInputChange('country', v)}
              onBlur={() => handleBlur('country')}
              touched={touched.country}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordField
              label="Password"
              value={formData.password}
              show={showPassword}
              setShow={setShowPassword}
              onChange={v => handleInputChange('password', v)}
              touched={touched.password}
              requirements={passwordRequirements}
            />
            <PasswordField
              label="Confirm Password"
              value={formData.confirmPassword}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
              onChange={v => handleInputChange('confirmPassword', v)}
              touched={touched.confirmPassword}
              passwordsMatch={passwordsMatch}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center p-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button type="button" onClick={onSwitchToLogin} className="text-green-600 hover:text-green-700 font-medium">
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

// Reusable components
const InputField = ({
  label, icon, value, onChange, onBlur, touched, valid, taken
}: InputFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={label}
        className={`pl-10 ${touched && valid ? 'border-green-300 focus:border-green-500' : touched && taken ? 'border-red-300 focus:border-red-500' : ''}`}
        required
      />
    </div>
    {touched && taken && <p className="text-xs text-red-600">{label} already exists</p>}
  </div>
)

const PasswordField = ({
  label, value, show, setShow, onChange, touched, requirements, passwordsMatch
}: PasswordFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={label}
        className="pl-10 pr-10"
        required
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
    {requirements && (
      <div className="bg-gray-50 rounded-md p-3 space-y-1.5">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-start gap-2">
            {req.met ? <Check className="w-4 h-4 text-green-600 mt-0.5" /> : <X className="w-4 h-4 text-gray-400 mt-0.5" />}
            <span className={`text-xs ${req.met ? 'text-green-700' : 'text-gray-600'}`}>{req.text}</span>
          </div>
        ))}
      </div>
    )}
    {passwordsMatch === false && <p className="text-xs text-red-600">Passwords do not match</p>}
    {passwordsMatch && <p className="text-xs text-green-600 flex items-center gap-1"><Check className="w-3 h-3" />Passwords match</p>}
  </div>
)

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-red-600">{message}</p>
  </div>
)

const SuccessMessage = ({ message }: { message: string }) => (
  <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-2">
    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-green-600">{message}</p>
  </div>
)