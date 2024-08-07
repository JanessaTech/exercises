import { atom } from "recoil"

export type DemoState = {
    value: string
}

const initDemoState: DemoState = {
    value: 'Defaut value'
}

export const demoState = atom<DemoState>({
	key: "authModalState",
	default: initDemoState,
});