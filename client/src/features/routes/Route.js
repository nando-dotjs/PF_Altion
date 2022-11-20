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
            <tr className="tableRow">
                <td className="tableCell routeStatus">
                    {route.state === 'Pendiente'
                        ? <span className="routeStatusCompleted">Pendiente</span>
                        : <span className="routeStatusOpen">Completado</span>
                    }
                </td> 
                <td className="tableCell routeDate">{dateObject.toLocaleDateString()}</td>
                <td className="tableCell routeTime">{route.time}</td>

                <td className="tableCell">
                    <button
                        className="btn btn-primary"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    &nbsp;
                    <button 
                        className="btn btn-primary"
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