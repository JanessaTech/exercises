import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface NoteState {
    isDone: boolean,
    notes: string[];
    addNote: (note: string) => void;
    setIsDone: (done: boolean) => void;
    clear: () => void
}

const useAddNote = create<NoteState>()(
    persist(
        (set) => ({
            notes: [],
            isDone: false,
            addNote: (newNote) => set((state) => ({notes: [...state.notes, newNote]})),
            setIsDone: (done) => set({isDone: done}),
            clear: () => {
                localStorage.removeItem('storage-key'),
                set({notes: []})
            }
        }),
        {
            name: 'storage-key', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setIsDone(true)
            }
        }
    ),
)

export default useAddNote