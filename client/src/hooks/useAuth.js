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
        const { username, roles } = decoded.UserInfo

        isAdmin = roles.includes('Admin')
        isCEV = roles.includes('CEV')
        isEmpresa = roles.includes('Empresa')

        if (isAdmin) status = "Admin"
        if (isCEV) status = "CEV"
        if (isEmpresa) status = "Empresa"

        return { username, roles, status, isAdmin, isCEV, isEmpresa }
    }

    return { username: '', roles: [], isAdmin, isCEV, isEmpresa, status }
}
export default useAuth