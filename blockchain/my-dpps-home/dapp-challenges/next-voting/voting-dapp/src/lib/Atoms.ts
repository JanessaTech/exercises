import { atom } from "recoil";
const localStorageEffect = (key: string) => ({setSelf, onSet}: {setSelf: Function, onSet: Function}) => {
    if (typeof window !== 'undefined') {
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
          setSelf(JSON.parse(savedValue))
        }
        onSet((newValue: any) => {
          localStorage.setItem(key, JSON.stringify(newValue))
        })
    }
  }

export type AuthState ={
    connected: boolean
}
const initAuthState: AuthState = {
    connected: false
}
export const authState = atom<AuthState>({
    key: 'authState',
    default: initAuthState,
    effects_UNSTABLE: [
        localStorageEffect('current_user'),
    ]
})