'use client'

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    login(
      { id: '1', name: 'Janessa', email: 'test@example.com' },
      'fake-jwt-token'
    )
    router.push('/dashboard')
  }
  return (
    <div>
      Janessa, Pls login!
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
