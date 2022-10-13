import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'

const Note = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="tableRow">
                <td className="tableCell noteStatus">
                    {note.completed
                        ? <span className="noteStatusCompleted">Completado</span>
                        : <span className="noteStatusOpen">Abierto</span>
                    }
                </td>
                <td className="tableCell noteCreated">{created}</td>
                <td className="tableCell noteUpdated">{updated}</td>
                <td className="tableCell noteTitle">{note.idFamily}</td>
                <td className="tableCell noteUsername">{note.username}</td>

                <td className="tableCell">
                    <button
                        className="icon-button tableButton"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Note