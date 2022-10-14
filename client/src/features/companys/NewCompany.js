import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewCompanyForm from './NewCompanyForm'

const NewCompany = () => {
    
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Actualmente esta funcionalidad no se encuentra disponible</p>

    const content = <NewCompanyForm users={users} />

    return content
}
export default NewCompany