import { faEye, faPenToSquare, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2
import { selectZoneById } from './zonesApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUpdateZoneStateMutation } from "./zonesApiSlice"

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



const Zone = ({ zoneId }) => {
    
    const zone = useSelector(state => selectZoneById(state, zoneId))

    const navigate = useNavigate()

    const [updateZoneState] = useUpdateZoneStateMutation()

    if (zone) {
        
        const handleEdit = () => navigate(`/dash/zones/${zoneId}`)
        const handleView = () => navigate(`/dash/zone/${zoneId}`)
        const updateZoneByClick = async () => {
            await updateZoneState({ id: zoneId })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                
                        })
                    } else{
                        Toast.fire({
                            icon: 'info',
                            title: response.data.message
                        })
                    }
                })
        }
        const cellStatus = zone.active ? '' : 'tableCell--inactive'

        return (
            <tr className="tableRow zone">
                <td className={`tableCell ${cellStatus}`}>{zone.name}</td>
                <td className={`tableCell ${cellStatus}`}>{zone.details}</td>
                <td className={`tableCell ${cellStatus}`}>
                    <button 
                        className="btn btn-primary"
                        onClick={handleView} 
                        title="Visualizar"
                    >  
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-primary"
                        onClick={handleEdit}
                        title="Editar"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    &nbsp;
                    <button 
                        className={zone.active ? "btn btn-success" : "btn btn-secondary"}
                        onClick={updateZoneByClick} 
                        title= {zone.active ? "Desactivar" : "Activar"}
                    >  
                        <FontAwesomeIcon icon={ zone.active ? faToggleOn : faToggleOff} />
                    </button>
                </td>
            </tr>
        )

    } else return ''
}

export default Zone