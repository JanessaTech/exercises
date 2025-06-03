"use client"

import { create } from 'zustand'

type State = {
    firstName: string;
    lastName: string
}
type Action = {
    updateFirstName: (firstName: string) => void;
    updateLastName: (lastName: string) => void
}

const userPersonStore = create<State & Action>((set) => ({
    firstName: '',
    lastName: '',
    updateFirstName: (firstName) => set(() => ({firstName: firstName})),
    updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))

const UpdateStatePage = () => {
    const firstName  = userPersonStore((state) => state.firstName)
    const updateFirstName = userPersonStore((state) => state.updateFirstName)
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