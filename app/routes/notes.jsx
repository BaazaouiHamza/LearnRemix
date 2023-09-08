import { redirect } from '@remix-run/node'
import NewNote, { links as newNotesLinks } from '../components/NewNote'
import { getStoredNotes, storeNotes } from '../data/notes'
import NoteList, { links as noteListLinks } from '../components/NoteList'
import { useLoaderData } from '@remix-run/react'

export default function NotesPage() {
    const notes = useLoaderData()
    return <main>
        <NewNote />
        <NoteList notes={notes} />
    </main>
}

export async function loader() {
    const notes = await getStoredNotes()

    return notes
}

export async function action({ request }) {
    const formData = await request.formData()
    const noteData = Object.fromEntries(formData)

    const existingNotes = await getStoredNotes()
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData)
    await storeNotes(updatedNotes)

    return redirect('/notes')
}

export function links() {
    return [...newNotesLinks(), ...noteListLinks()]
}