import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'


interface AuthState {
    auth: AuthenticationStatus;
    setAuth: (status: AuthenticationStatus) => void;
    isDone: boolean;
    setIsDone: (done: boolean) => void
}

const useAuthState = create<AuthState>()(persist(
    (set) => ({
        auth: 'loading',
        isDone: false,
        setAuth: (status) => set({auth: status}),
        setIsDone: (done) => set({isDone: done})
    }),
    {
        name: 'auth_state',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            state?.setIsDone(true)
        }
    }
))

export default useAuthState