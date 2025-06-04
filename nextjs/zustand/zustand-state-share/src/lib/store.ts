import { create } from 'zustand';

interface NoteState {
    notes: string[],
    addNote: (note: string) => void
}

const useAddNote = create<NoteState>()((set) => ({
    notes:[],
    addNote: (note) => set((state) => ({notes: [...state.notes, note]}))
}))

export default useAddNote