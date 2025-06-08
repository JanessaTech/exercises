import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface NoteStatus {
    notes: string[];
    isDone: boolean;
    addNote: (note: string) => void;
    setIsDone : (status: boolean) => void;
    clear: () => void
}

const useAddNote = create<NoteStatus>()(persist(
    (set) => ({
        notes: [],
        isDone: false,
        addNote: (note) => set((state) => ({notes:[...state.notes, note]})),
        setIsDone: (status) => set({isDone: status}),
        clear: () => {
            localStorage.removeItem('note_status')
            set({notes: []})
        }
    }),
    {
        name: 'note_status',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {

        }
    }
))

export default useAddNote