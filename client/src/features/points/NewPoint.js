import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewPointForm from './NewPointForm'

const NewPoint = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return 

    const content = <NewPointForm users={users} />

    return content
}
export default NewPoint