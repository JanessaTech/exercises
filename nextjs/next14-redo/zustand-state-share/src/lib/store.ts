
import { BlobOptions } from 'buffer';
import {create } from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

interface NoteState {
    notes: string[];
    addNote: (note: string) => void;
    isDone: boolean;
    setIsDone: (done: boolean) => void;
    clear: () => void
}

const useAddNote = create<NoteState>()(persist(
    (set) => ({
        notes: [],
        addNote: (note) => set((state) =>({notes: [...state.notes, note]})),
        isDone: false,
        setIsDone: (done) => set({isDone: done}),
        clear: () => {
            localStorage.removeItem('state_note')
            set({notes: []})
        }
    }),
    {
        name: 'state_note',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () =>(state) => {
            state?.setIsDone(true)
        }
    }
))

export default useAddNote