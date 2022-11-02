import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
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

        return (
            <tr className="tableRow">
                <td className="tableCell pointStatus">
                    {point.completed
                        ? <span className="pointStatusCompleted">Completado</span>
                        : <span className="pointStatusOpen">Abierto</span>
                    }
                </td>
                <td className="tableCell pointCreated">{created}</td>
                <td className="tableCell pointUpdated">{point.zone}</td>
                <td className="tableCell pointTitle">{point.details}</td>
                <td className="tableCell pointUsername">{point.username}</td>

                <td className="tableCell">
                    <button
                        className="icon-button tableButton"
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