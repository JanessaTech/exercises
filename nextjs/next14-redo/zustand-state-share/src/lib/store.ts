
import {create } from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

interface NoteState {
    notes: string[];
    addNote: (note:string) => void;
    isDone: boolean
    setIsDone: (done: boolean) => void;
    clear: () => void
}

const useAddNote = create<NoteState>()(persist(
    (set) => ({
        notes: [],
        isDone: false,
        setIsDone: (done) => set({isDone: done}),
        addNote: (note) => set((state) => ({notes: [...state.notes, note]})),
        clear: () => {
            localStorage.removeItem('note_state')
            set({notes: []})
        }
    }),
    {
        name: '',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            state?.setIsDone(true)
        }
    }
))

export default useAddNote
