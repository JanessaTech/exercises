import { create } from 'zustand';

interface NoteState {
    notes: string[];
    addNote: (note: string) => void
}

const useAddNote = create<NoteState>()((set) => ({
    notes: [],
    addNote: (newNote) => set((state) => ({notes: [...state.notes, newNote]}))
}))

export default useAddNote