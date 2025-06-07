'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { setCookie } from 'cookies-next'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let token = 'fake-jwt-token'
    login({ name: 'Janessa', email: 'user@example.com' }, token)
    setCookie('token', token, { maxAge: 60 * 60 * 24 })
    router.push('/dashboard')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
