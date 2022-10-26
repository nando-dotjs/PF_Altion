import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectZoneById } from './zonesApiSlice'
import EditZoneForm from './EditZoneForm'

const EditZone = () => {
    const { id } = useParams()

    const zone = useSelector(state => selectZoneById(state, id))

    const content = zone ? <EditZoneForm zone={zone} /> : <p>Cargando...</p>

    return content
}
export default EditZone