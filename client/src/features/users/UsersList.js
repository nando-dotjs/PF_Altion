import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
    useTitle('Lista de Usuarios')
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)
            
        content = (
            <table className="table tableUsers">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh userUsername">Usuario</th>
                        <th scope="col" className="tableTh userRoles">Roles</th>
                        <th scope="col" className="tableTh userEdit">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default UsersList