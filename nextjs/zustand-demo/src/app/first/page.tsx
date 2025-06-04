"use client"

import { create } from 'zustand'

type State = {
    firstName: string,
    lastName : string
}
type Action = {
    updateFirstName: (firstName: string) => void,
    updaetLastName: (lastName: string) => void
}

const usePersonStore = create<State & Action>()((set) => ({
    firstName: '',
    lastName: '',
    updateFirstName: (firstName) => set(() => ({firstName: firstName})),
    updaetLastName: (lastName) => set(() => ({lastName: lastName}))
}))

const UpdateStatePage = () => {
    const firstName = usePersonStore((state) => state.firstName)
    const updateFirstName = usePersonStore((state) => state.updateFirstName)

    return (
        <>
            <label>First Name: 
                    <input className='border-2 border-zinc-400'
                        onChange={(e) => updateFirstName(e.currentTarget.value)}
                        value={firstName}
                        />
            </label>
            <p>
                Hello, <strong>{firstName}!</strong>
            </p>
        </>
    )
}

export default UpdateStatePage