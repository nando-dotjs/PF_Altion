import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlay} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectRouteById } from './routesApiSlice'

const Route = ({ routeId }) => {
    const route = useSelector(state => selectRouteById(state, routeId))

    const navigate = useNavigate()
    if (route) {
        const handleEdit = () => navigate(`/dash/routes/${routeId}`)

        const handleInit = () => navigate(`/dash/routes/init/${routeId}`)

        const cellStatus = route.state ? '' : 'tableCell--inactive'

        var dateObject = new Date(route.date);


        return (
            <tr className="tableRow route">
                <td className={`tableCell ${cellStatus}`}>{dateObject.toLocaleDateString()}</td>
                <td className={`tableCell ${cellStatus}`}>{route.time}</td>
                <td className={`tableCell ${cellStatus}`}>{route.state}</td>    
                <td className={`tableCell ${cellStatus}`}>
                    <button
                        className="icon-button tableButton"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
                <td className={`tableCell ${cellStatus}`}>
                    <button
                        className="icon-button tableButton"
                        onClick={handleInit}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Route