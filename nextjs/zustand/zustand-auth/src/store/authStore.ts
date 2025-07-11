import { create } from 'zustand'

type AuthState = {
  user: null | { name: string; email: string }
  token: string | null
  login: (user: { name: string; email: string }, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')!) 
    : null,
  token: localStorage.getItem('token'),
  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))