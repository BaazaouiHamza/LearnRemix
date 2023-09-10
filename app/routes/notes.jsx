import { json, redirect } from '@remix-run/node'
import NewNote, { links as newNotesLinks } from '../components/NewNote'
import { getStoredNotes, storeNotes } from '../data/notes'
import NoteList, { links as noteListLinks } from '../components/NoteList'
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react'

export default function NotesPage() {
    const notes = useLoaderData()
    return <main>
        <NewNote />
        <NoteList notes={notes} />
    </main>
}

export async function loader() {
    const notes = await getStoredNotes()
    if (!notes || notes.length === 0) {
        throw json({ message: 'Could not find any notes.' }, {
            status: 404,
            statusText: "Not Found",
        })
    }
    return notes
}

export async function action({ request }) {
    const formData = await request.formData()
    const noteData = Object.fromEntries(formData)

    if (noteData.title.trim().length < 5) {
        return { message: "Invalid title - must be at least 5 charachters long." }
    }

    const existingNotes = await getStoredNotes()
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData)
    await storeNotes(updatedNotes)

    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))

    return redirect('/notes')
}

export function links() {
    return [...newNotesLinks(), ...noteListLinks()]
}

export function ErrorBoundary() {
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <NewNote />
                <p className='info-message'>
                    {error.data?.message || 'Data not found.'}
                </p>
            </main>
        );
    } else if (error instanceof Error) {
        return (
            <main className='error'>
                <h1>
                    An error occured!
                </h1>
                <p>{error?.message}</p>
                <p>Back to <Link to="/">Safety!</Link></p>
            </main>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}
