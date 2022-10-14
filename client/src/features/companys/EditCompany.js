import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCompanyById } from './companysApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditCompanyForm from './EditCompanyForm'

const EditCompany = () => {
    const { id } = useParams()

    const company = useSelector(state => selectCompanyById(state, id))
    const users = useSelector(selectAllUsers)

    const content = company && users ? <EditCompanyForm company={company} users={users} /> : <p>Cargando...</p>

    return content
}
export default EditCompany