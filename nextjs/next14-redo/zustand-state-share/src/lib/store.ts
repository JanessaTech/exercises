
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
        isDone: false,
        addNote: (note) => set((state) => ({notes: [...state.notes, note]})),
        setIsDone: (done) => set({isDone: done}),
        clear: () => {
            localStorage.removeItem('note_state')
            set({notes:[]})
        }
    }), {
        name: 'note_state', 
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            state?.setIsDone(true)
        }
    }
))

export default useAddNote