import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faPenToSquare, faPersonWalkingWithCane, faToggleOn,faToggleOff, faTrash, faEye,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectDriverById } from './driversApiSlice'
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2
import { useUpdateDriverStateMutation } from "./driversApiSlice"

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




const Driver = ({ driverId }) => {
    
    const driver = useSelector(state => selectDriverById(state, driverId))

    const navigate = useNavigate()

    const [updateDriverState, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateDriverStateMutation()


    if (driver) {
        
        const handleEdit = () => navigate(`/dash/drivers/${driverId}`)
        const handleView = () => navigate(`/dash/driver/${driverId}`)
        const updateDriverByClick = async () => {
            await updateDriverState({ id: driverId })
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
        const cellStatus = driver.active ? '' : 'tableCell--inactive'

        return (
            <tr className="tableRow driver">
                <td className={`tableCell ${cellStatus}`}>{driver.name}</td>
                <td className={`tableCell ${cellStatus}`}>{driver.surname}</td>
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
                        
                        className={driver.active ? "btn btn-success" : "btn btn-secondary"} 
                        onClick={updateDriverByClick} 
                    >  
                        <FontAwesomeIcon  icon={ driver.active ? faToggleOn : faToggleOff} />
                    </button>
                    
                </td>
            </tr>
        )

    } else return null
}
export default Driver