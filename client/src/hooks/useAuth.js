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
        const { username, role } = decoded.UserInfo

        isAdmin = role === 'Admin'
        isCEV = role === 'CEV'
        isEmpresa = role === 'Empresa'

        if (isAdmin) status = "Admin"
        if (isCEV) status = "CEV"
        if (isEmpresa) status = "Empresa"

        return { username, role, status, isAdmin, isCEV, isEmpresa }
    }

    return { username: '', role: '', isAdmin, isCEV, isEmpresa, status }
}
export default useAuth