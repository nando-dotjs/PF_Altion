import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown,faEye, faPenToSquare, faPersonWalkingWithCane, faToggleOn,faToggleOff,  faTrash} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectZoneById } from './zonesApiSlice'
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2
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

    const [updateZoneState, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateZoneStateMutation()

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
                    &nbsp;
                    <button 
                        className={zone.active ? "btn btn-success" : "btn btn-secondary"}
                        onClick={updateZoneByClick} 
                    >  
                        <FontAwesomeIcon icon={ zone.active ? faToggleOn : faToggleOff} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Zone