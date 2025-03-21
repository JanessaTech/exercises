import { atom } from "recoil";

export type AuthState ={
    connected: boolean
}
const initAuthState: AuthState = {
    connected: false
}
export const authState = atom<AuthState>({
    key: 'authState',
    default: initAuthState
})