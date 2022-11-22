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
// import BootstrapTable from 'react-bootstrap-table-next';
// import axios from 'react-axios'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import InputGroup from 'react-bootstrap/InputGroup';

import Form from 'react-bootstrap/Form';


const UsersList = () => {

    const [filtroTexto, setTexto] = useState('');
    const [viewInactives, setViewInactives] = useState(false);
    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    useTitle('Lista de Usuarios')

    const onChangeText = e => setTexto(e.target.value)
    const onActiveChanged = e => setViewInactives(!viewInactives)

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
    // const date = new Date()
    // const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, name, mail, role, entities } = users
        // console.log(users)


        let filteredIds
        if (viewInactives) {
            filteredIds = [...ids]
            if (filtroTexto !== '') {
                filteredIds = ids.filter(userId => (entities[userId].name.toUpperCase() + ' ' + entities[userId].surname.toUpperCase() + ' ' + entities[userId].role.toUpperCase()).includes(filtroTexto.toUpperCase()))
            }
        } else {
            filteredIds = ids.filter(userId => (entities[userId].active === true))
            if (filtroTexto !== '') {
                filteredIds = ids.filter(userId => (entities[userId].name.toUpperCase() + ' ' + entities[userId].surname.toUpperCase() + ' ' + entities[userId].role.toUpperCase()).includes(filtroTexto.toUpperCase()) && entities[userId].active === true)
            }
        }


        const tableContent = ids?.length && filteredIds.map(userId => <User key={userId} userId={userId} />)
        //    const search = (ids?.length) && (ids.map(userId => <User key={userId} userId={userId} />) 
        // const search = (ids) => { return ids.filter(userId => userId.mail.toLowerCase().includes(query)) }
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };
        //temporal
        console.log()
        // const search = (tableContent)=>{return tableContent.filter(users=>users.mail.toLowerCase().includes(query))}
        //temporal
        // console.log(query)

        // useEffect(() => {

        // })

        content = (
            <>

                <Container>


                    <br/>
                    <div id="fondoTabla">
                        <InputGroup.Text>
                        &nbsp; &nbsp; <input className="form-control" placeholder="Filtrar" value={filtroTexto} onChange={onChangeText} type="text"></input>
                        &nbsp; &nbsp;
                        <strong>Mostrar usuarios inactivos: </strong>

                            <InputGroup.Checkbox
                                placeholder="Mostrar usuarios inactivos"
                                className="filterActives"
                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                value={viewInactives}
                                onChange={onActiveChanged}

                            /></InputGroup.Text>     
                    </div>
                    <div id="fondoTabla">

                        <Table
                            // data={search(tableContent)} 
                            striped bordered hover size="sm" className="table tableUsers">
                            <thead>
                                <tr>
                                    <th>Usuario <input id="filterByEmail"
                                        placeholder="Buscar..."
                                        onChange={e => setQuery(e.target.value)} />
                                    </th>

                                    <th>Roles<input id="filterByEmail" placeholder="Buscar..." />
                                    </th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* temporal */}
                                {/* {search(tableContent)} */}
                                {tableContent}
                            </tbody>
                        </Table>

                    </div>

                </Container>

            </>
        )
    }

    return content
}
export default UsersList