import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCompanyById } from './companysApiSlice'

const Company = ({ companyId }) => {

    const company = useSelector(state => selectCompanyById(state, companyId))

    const navigate = useNavigate()

    if (company) {
        const created = new Date(company.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const updated = new Date(company.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/companys/${companyId}`)

        return (
            <tr className="tableRow">
                <td className="tableCell companyStatus">
                    {company.completed
                        ? <span className="companyStatusCompleted">Completado</span>
                        : <span className="companyStatusOpen">Abierto</span>
                    }
                </td>
                <td className="tableCell companyStatusCreated">{created}</td>
                <td className="tableCell companyStatusUpdated">{updated}</td>
                <td className="tableCell companyStatusTitle">{company.fantasyName}</td>
                <td className="tableCell companyStatusUsername">{company.username}</td>

                <td className="tableCell">
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
export default Company