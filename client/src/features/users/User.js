import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faPenToSquare, faPersonWalkingWithCane, faToggleOn, faTrash} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useUpdateUserStateMutation } from "./usersApiSlice"

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2

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

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    const [updateUserState, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserStateMutation()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        const updateUserByClick = async () => {
              await updateUserState({ id: userId })
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
        const cellStatus = user.active ? '' : 'tableCell--inactive'
// console.log(user)
       
return (
            <tr className="tableRow user">
                {/* <td className={`tableCell ${cellStatus}`}>{user.mail}</td>
                <td className={`tableCell ${cellStatus}`}>{user.role}</td> */}
                <td>{user.mail}</td>
                <td>{user.role}</td>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={handleEdit}
                    >                      
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    
                    <button 
                        className="btn btn-warning"
                        onClick={updateUserByClick} 
                    >  
                        <FontAwesomeIcon icon={faToggleOn} />
                    </button>
     
                </td>
            </tr>
        )

    } else return null
}
export default User