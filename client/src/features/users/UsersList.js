import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <table className="table tableUsers">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh userUsername">Username</th>
                        <th scope="col" className="tableTh userRoles">Roles</th>
                        <th scope="col" className="tableTh userEdit">Edit</th>
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