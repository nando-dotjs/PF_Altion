import { faEye, faPenToSquare, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { selectUserById } from './usersApiSlice'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUpdateUserStateMutation } from "./usersApiSlice"

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

    const { mail } = useAuth()

    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    const [updateUserState] = useUpdateUserStateMutation()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        const handleView = () => navigate(`/dash/user/${userId}`)
        const updateUserByClick = async () => {
            if(user.mail !== mail){
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
            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'No es posible desactivar este usuario'
                    })
            }
        }
       
        return (
            <tr className="tableRow user">
                <td>{user.name +' '+user.surname}</td>
                <td>{user.role}</td>
                <td>
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
                        className={user.active ? "btn btn-success" : "btn btn-secondary"}
                        onClick={updateUserByClick} 
                        title= {user.active ? "Desactivar" : "Activar"}
                    >  
                        <FontAwesomeIcon icon={user.active ? faToggleOn : faToggleOff} />
                    </button>
                </td>
            </tr>
        )

    } else return ''
}
export default User