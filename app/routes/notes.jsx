import NewNote, { links as newNotesLinks } from '../components/NewNote'

export default function NotesPage() {
    return <main>
        <NewNote />
    </main>
}

export function links() {
    return [...newNotesLinks()]
}