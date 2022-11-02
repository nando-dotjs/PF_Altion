import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewPointForm from './NewPointForm'

const NewPoint = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Actualmente esta funcionalidad no se encuentra disponible</p>

    const content = <NewPointForm users={users} />

    return content
}
export default NewPoint