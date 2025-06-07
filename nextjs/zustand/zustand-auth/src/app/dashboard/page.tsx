'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { deleteCookie } from 'cookies-next'

export default function DashboardPage() {
    const router = useRouter()
    const { user, logout } = useAuthStore()
  
    const handleLogout = () => {
      logout()
      deleteCookie('token')
      router.push('/')
    }
  
    return (
      <div>
        <h1>Welcome {user?.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }