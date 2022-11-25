import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewZoneForm from './NewZoneForm'

const NewZone = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return

    const content = <NewZoneForm users={users} />

    return content
}
export default NewZone