import './register.css'
import './Table.css';

import { Container, InputGroup, Pagination, Table } from 'react-bootstrap'

import Swal from "sweetalert2";
import User from './User'
import { useGetUsersQuery } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useTitle from "../../hooks/useTitle"

const UsersList = () => {

    const [filtroTexto, setTexto] = useState('');
    const [viewInactives, setViewInactives] = useState(false);
    const [page, setPage] = useState(1)
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

    let content

    if (isLoading) content = (
        <div className="loader"></div>
    )

    if (isError) {

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: error?.data?.message,
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/dash')
    }

    if (isSuccess) {

        const { ids, entities } = users

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

        const tableContent = ids?.length && filteredIds.slice(page*10-10, page*10).map(userId => <User key={userId} userId={userId} />)

        let items = [];

        const handlePage = (n) => {
            setPage(n)
            items = []
        }

        const nextPage = () => {
            if(items.length !== page){
                setPage(page+1)
            }
        }

        const lastPage = () => {
            setPage(items.length)
        }

        const firstPage = () => {
            setPage(1)
        }

        const prevPage = () => {
            if(page !== 1){
                setPage(page-1)
            }
        }

        for (let number = 1; number < (filteredIds.length/10)+1; number++) {
            items.push(number);
        }

        let pagination = items.map(number => <Pagination.Item key={number} active={number === page} onClick={() => handlePage(number)}>{number}</Pagination.Item>)

        content = (
            <>
                <Container>
                    <br/>
                    <div id="fondoTablaFiltro">
                        <InputGroup.Text>
                            &nbsp; &nbsp; 
                            <input className="filtroFiltrar form-control" placeholder="Filtrar" value={filtroTexto} onChange={onChangeText} type="text"></input>
                            &nbsp; &nbsp;
                            <strong className="tituloCheck">Mostrar usuarios inactivos: </strong>
                            <InputGroup.Checkbox
                                placeholder="Mostrar usuarios inactivos"
                                className="filterActives"
                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                value={viewInactives}
                                onChange={onActiveChanged}

                            />
                        </InputGroup.Text>     
                    </div>
                    <div id="fondoTabla">
                        <Table
                            striped bordered hover size="sm" className="table tableUsers">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Roles</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>
                        <Pagination.First onClick={() => firstPage()} />
                        <Pagination.Prev onClick={() => prevPage()} />
                            {pagination}
                        <Pagination.Next onClick={() => nextPage()} />
                        <Pagination.Last onClick={() => lastPage()} />
                    </Pagination>
                </Container>

            </>
        )
    }

    return content
}
export default UsersList