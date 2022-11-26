import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlay,faEye} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectRouteById } from './routesApiSlice'
import Swal from "sweetalert2"


const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

const Route = ({ routeId }) => {
    const route = useSelector(state => selectRouteById(state, routeId))

    const navigate = useNavigate()
    if (route) {
        const handleEdit = () => navigate(`/dash/routes/${routeId}`)

        const handleInit = () => {
            if(route.state==='Pendiente'){
                navigate(`/dash/routes/init/${routeId}`)
            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'No es posible ejecutar un recorrido ya completado'
                  })
            }
        }

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
                        title="Editar"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    &nbsp;
                    <button 
                        className="btn btn-primary"
                        onClick={handleInit} 
                        title= {route.state ==='Pendiente' ? "Ejecutar" : "Visualizar"}
                    >  
                        <FontAwesomeIcon fixedWidth icon={route.state ==='Pendiente' ? faPlay : faEye} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Route