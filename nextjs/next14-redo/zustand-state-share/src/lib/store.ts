
import {create } from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

interface NoteState {
    notes: string[];
    isDone: boolean;
    setIsDone: (done: boolean) => void;
    addNote: (note: string) => void;
    clear: () => void
}

const useAddNote = create<NoteState>()(
    persist(
        (set) => ({
            notes: [],
            isDone: true,
            addNote: (note) => set((state) => ({notes: [...state.notes, note]})),
            setIsDone: (done) => set({isDone: done}),
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
    )
    
)

export default useAddNote
