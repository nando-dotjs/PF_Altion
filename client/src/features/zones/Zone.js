import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectZoneById } from './zonesApiSlice'

const Zone = ({ zoneId }) => {
    
    const zone = useSelector(state => selectZoneById(state, zoneId))

    const navigate = useNavigate()

    if (zone) {
        
        const handleEdit = () => navigate(`/dash/zones/${zoneId}`)

        const cellStatus = zone.active ? '' : 'tableCell--inactive'

        return (
            <tr className="tableRow zone">
                <td className={`tableCell ${cellStatus}`}>{zone.name}</td>
                <td className={`tableCell ${cellStatus}`}>{zone.details}</td>
                <td className={`tableCell ${cellStatus}`}>
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
export default Zone