import { fetchApi } from '@/utils/http'
import { z } from 'zod'

// ✅ Request schema for login (correct)
const SignInRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignInRequest = z.infer<typeof SignInRequestSchema>

// ✅ Response schema matching your backend response
const SignInResponseSchema = z.object({
  data: z.object({
    token: z.string(),
    user: z.object({
      userId: z.number(),
      username: z.string(),
      role: z.number().optional() // Assuming roleId is returned directly
      // Add other fields as needed from your backend
    }),
  }),
})
export type SignInResponse = z.infer<typeof SignInResponseSchema>

// ✅ Function to call the login API
export async function signIn(credentials: SignInRequest ) {
  return fetchApi<SignInResponse>({
    url: 'api/auth/login',
    method: 'POST',
    body: credentials,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
