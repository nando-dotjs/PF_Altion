import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import './register.css'
import DashFooter from "../../components/DashFooter";

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
    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, name, mail, role } = users
        console.log(users)

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)
        content = (

            <Container>
                 <section className="welcome">
                        <div id="fechaDiv" className="">

                            <p>{today}</p>

                        </div>
                    </section>
                <br />
                <div id="fondoTabla">

                    <Table striped bordered hover size="sm" className="table tableUsers">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Roles</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <th>{name}</th>
                            {tableContent}
                        </tbody>
                    </Table>
                    
                </div>
               
            </Container>

        )
    }

    return content
}
export default UsersList