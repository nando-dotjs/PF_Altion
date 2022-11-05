import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import './register.css'
import DashFooter from "../../components/DashFooter";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';

const UsersList = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
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


        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };


        content = (
            <>
                <Modal show={!show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="cabezal"><strong>Lista de Usuarios</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        {/* <Button variant="primary" onClick={onSaveUserClicked} disabled={!validUsername || !validPassword || !validMatch ? true : false}>
           Registrar
          </Button> */}
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return content
}
export default UsersList