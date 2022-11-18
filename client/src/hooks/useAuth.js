import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isCEV = false
    let isEmpresa = false
    let isRecolector = false
    let status = "Normal"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, mail, name, surname, role } = decoded.UserInfo

        isRecolector = role ==='Recolector'
        isAdmin = role === 'Admin'
        isCEV = role === 'CEV'
        isEmpresa = role === 'Empresa'

        if (isRecolector) status = "Recolector"
        if (isAdmin) status = "Admin"
        if (isCEV) status = "CEV"
        if (isEmpresa) status = "Empresa"

        return { mail, role, name, surname, status, isAdmin, isCEV, isEmpresa, isRecolector, id }
    }

    return { id: '', mail: '', role: '', name: '', surname: '', isAdmin, isCEV, isEmpresa, isRecolector, status }
}
export default useAuth