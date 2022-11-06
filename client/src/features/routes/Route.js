import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectRouteById } from './routesApiSlice'

const Route = ({ routeId }) => {
    const route = useSelector(state => selectRouteById(state, routeId))

    const navigate = useNavigate()

    if (route) {
        const handleEdit = () => navigate(`/dash/routes/${routeId}`)

        const cellStatus = route.state ? '' : 'tableCell--inactive'

        return (
            <tr className="tableRow route">
                <td className={`tableCell ${cellStatus}`}>{route.date}</td>
                <td className={`tableCell ${cellStatus}`}>{route.time}</td>
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
export default Route