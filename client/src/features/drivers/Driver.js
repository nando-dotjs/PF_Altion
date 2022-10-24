import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectDriverById } from './driversApiSlice'

const Driver = ({ driverId }) => {
    
    const driver = useSelector(state => selectDriverById(state, driverId))

    const navigate = useNavigate()

    if (driver) {
        
        const handleEdit = () => navigate(`/dash/drivers/${driverId}`)

        const cellStatus = driver.active ? '' : 'tableCell--inactive'

        return (
            <tr className="tableRow driver">
                <td className={`tableCell ${cellStatus}`}>{driver.name}</td>
                <td className={`tableCell ${cellStatus}`}>{driver.surname}</td>
                <td className={`tableCell ${cellStatus}`}>
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
export default Driver