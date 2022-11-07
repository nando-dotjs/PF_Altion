import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPointById } from './pointsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditPointForm from './EditPointForm'

const EditPoint = () => {
    const { id } = useParams()

    const point = useSelector(state => selectPointById(state, id))
    const users = useSelector(selectAllUsers)

    const content = point && users ? <EditPointForm point={point} users={users} /> : <p>Cargando...</p>

    return content
}
export default EditPoint