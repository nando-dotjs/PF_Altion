import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

const NewNote = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Actualmente esta funcionalidad no se encuentra disponible</p>

    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote