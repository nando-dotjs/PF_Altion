import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faEye } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPointById } from './pointsApiSlice'

const Point = ({ pointId }) => {

    const point = useSelector(state => selectPointById(state, pointId))

    const navigate = useNavigate()

    if (point) {
        const created = new Date(point.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const updated = new Date(point.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/points/${pointId}`)
        const handleView = () => navigate(`/dash/point/${pointId}`)

        console.log(point);
        return (
            <tr className="tableRow">
                <td className="tableCell pointStatus">
                    {point.completed
                        ? <span className="pointStatusCompleted">Activo</span>
                        : <span className="pointStatusOpen">Pendiente</span>
                    }
                </td>
                <td className="tableCell pointTitle">{point.name}</td>
                <td className="tableCell pointUpdated">{point.zone}</td>

                <td className="tableCell">
                    <button 
                        className="btn btn-primary"
                        onClick={handleView} 
                    >  
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-primary"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Point