import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectDriverById } from './driversApiSlice'
import EditDriverForm from './EditDriverForm'

const EditDriver = () => {
    const { id } = useParams()

    const driver = useSelector(state => selectDriverById(state, id))

    const content = driver ? <EditDriverForm driver={driver} /> : <p>Cargando...</p>

    return content
}
export default EditDriver