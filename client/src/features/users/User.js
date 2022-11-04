import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const cellStatus = user.active ? '' : 'tableCell--inactive'

        return (
            <tr className="tableRow user">
                <td className={`tableCell ${cellStatus}`}>{user.mail}</td>
                <td className={`tableCell ${cellStatus}`}>{user.role}</td>
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
export default User