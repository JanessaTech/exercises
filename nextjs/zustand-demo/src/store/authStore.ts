import { create } from 'zustand'
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware';

type User = {
    id: string,
    name: string,
    email: string
}
type AuthState = {
    user: User | null,
    token: string | null,
    isAuthenticated: () => boolean
    login: (user: User, token: string) => void
    logout: () => void
}

const storage: StateStorage  = {
    getItem: (name: string) => {
      if (typeof window === 'undefined') return null
      return localStorage.getItem(name)
    },
    setItem: (name: string, value: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(name, value)
      }
    },
    removeItem: (name: string) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(name)
      }
    }
  }

export const useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: () => !!get().token,
        login: (user, token) => 
          set({ user, token}),
        logout: () => 
          set({ user: null, token: null})
      }),
      {
        name: 'auth-storage1', // key in localStorage
        storage: createJSONStorage(() => storage), // SSR compatible issue
      }
    )
  )