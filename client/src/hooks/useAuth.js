import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isCEV = false
    let isEmpresa = false

    let status = "Normal"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, mail, role } = decoded.UserInfo

        isAdmin = role === 'Admin'
        isCEV = role === 'CEV'
        isEmpresa = role === 'Empresa'

        if (isAdmin) status = "Admin"
        if (isCEV) status = "CEV"
        if (isEmpresa) status = "Empresa"

        return { mail, role, status, isAdmin, isCEV, isEmpresa, id }
    }

    return { id: '', mail: '', role: '', isAdmin, isCEV, isEmpresa, status }
}
export default useAuth