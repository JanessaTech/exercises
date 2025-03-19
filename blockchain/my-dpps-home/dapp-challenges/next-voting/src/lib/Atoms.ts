import { atom } from "recoil";

export type ConnectState ={
    connected: boolean
}
const initConnectState: ConnectState = {
    connected: false
}
export const connectState = atom<ConnectState>({
    key: 'connectState',
    default: initConnectState
})