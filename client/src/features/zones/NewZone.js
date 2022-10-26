import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewZoneForm from './NewZoneForm'

const NewZone = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Actualmente esta funcionalidad no se encuentra disponible</p>

    const content = <NewZoneForm users={users} />

    return content
}
export default NewZone