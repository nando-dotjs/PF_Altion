import { useGetDriversQuery } from "./driversApiSlice"
import Driver from './Driver'
import useTitle from "../../hooks/useTitle"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import '../users/register.css'
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from "sweetalert2";
import '../users/Table.css';

const DriversList = () => {

    const [filtroTexto, setTexto] = useState('');
    const [viewInactives,setViewInactives] = useState(false);
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    useTitle('Lista de Choferes')

    const onChangeText = e => setTexto(e.target.value)
    const onActiveChanged = e => setViewInactives(!viewInactives)
    const {
        data: drivers,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDriversQuery('driversList', {
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

        const { ids, entities } = drivers

        let filteredIds
        if(viewInactives){
            filteredIds = [...ids]
            if (filtroTexto !==  ''){
                filteredIds = ids.filter(driverId => (entities[driverId].name.toUpperCase()+' '+entities[driverId].surname.toUpperCase()).includes(filtroTexto.toUpperCase()))
            }   
        }else{
            filteredIds = ids.filter(driverId => (entities[driverId].active===true))
            if (filtroTexto !==  ''){
                filteredIds = ids.filter(driverId => (entities[driverId].name.toUpperCase()+' '+entities[driverId].surname.toUpperCase()).includes(filtroTexto.toUpperCase())&& entities[driverId].active ===true)
            } 
        }

        const tableContent = ids?.length && filteredIds.slice(page*10-10, page*10).map(driverId => <Driver key={driverId} driverId={driverId} />)

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
                &nbsp; &nbsp; <input className="filtroFiltrar form-control" placeholder="Filtrar" value={filtroTexto} onChange={onChangeText} type="text"></input>
                &nbsp; &nbsp;
                <strong className="tituloCheck">Mostrar choferes inactivos: </strong>
                    <InputGroup.Checkbox
                        placeholder="Mostrar choferes inactivos"
                        className="filterActives"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        value={viewInactives}
                        onChange={onActiveChanged}
                    /></InputGroup.Text>     
            </div>
            <div id="fondoTabla">

            <Table striped bordered hover size="sm" className="table tableDrivers">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
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
export default DriversList