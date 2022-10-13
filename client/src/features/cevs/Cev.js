import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCevById } from './cevsApiSlice'

const Cev = ({ cevId }) => {

    const cev = useSelector(state => selectCevById(state, cevId))

    const navigate = useNavigate()

    if (cev) {
        const created = new Date(cev.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const updated = new Date(cev.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/cevs/${cevId}`)

        return (
            <tr className="tableRow">
                <td className="tableCell cevStatus">
                    {cev.completed
                        ? <span className="cevStatusCompleted">Completado</span>
                        : <span className="cevStatusOpen">Abierto</span>
                    }
                </td>
                <td className="tableCell cevCreated">{created}</td>
                <td className="tableCell cevUpdated">{updated}</td>
                <td className="tableCell cevTitle">{cev.idFamily}</td>
                <td className="tableCell cevUsername">{cev.username}</td>

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
export default Cev