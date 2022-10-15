import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewCevForm from './NewCevForm'

const NewCev = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Actualmente esta funcionalidad no se encuentra disponible</p>

    const content = <NewCevForm users={users} />

    return content
}
export default NewCev