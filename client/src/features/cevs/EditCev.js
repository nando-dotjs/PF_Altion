import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCevById } from './cevsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditCevForm from './EditCevForm'

const EditCev = () => {
    const { id } = useParams()

    const cev = useSelector(state => selectCevById(state, id))
    const users = useSelector(selectAllUsers)

    const content = cev && users ? <EditCevForm cev={cev} users={users} /> : <p>Cargando...</p>

    return content
}
export default EditCev