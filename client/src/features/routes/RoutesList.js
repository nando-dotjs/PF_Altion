import { useGetRoutesQuery } from "./routesApiSlice"
import Route from './Route'
//import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import {Table, Container} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { useNavigate } from "react-router-dom"
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from "sweetalert2";
import Pagination from 'react-bootstrap/Pagination';

const RoutesList = () => {

 //   const { mail, isAdmin } = useAuth()
    registerLocale('es', es)

    const [viewCompleted, setViewCompleted] = useState(true)
    const [filterDate, setFilterDate] = useState('')
    const [page, setPage] = useState(1)

    const navigate = useNavigate()
    const onActiveChanged = e => setViewCompleted(!viewCompleted)
    const onChangeText = e => setFilterDate(e)

    useTitle('Lista de Recorridos')
    const {
        data: routes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRoutesQuery('routesList', {
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

    useEffect(() => {

    }, [filterDate,viewCompleted])


    if (isSuccess) {
        let filtroSimplicado = new Date(Date.parse(filterDate))
        
        const { ids, entities } = routes

    	let filteredIds 
        if(viewCompleted){
            filteredIds = ids.filter(routeId => (entities[routeId].state === 'Pendiente'))
            if (filterDate !== '' && filterDate !== null ) {
                filteredIds = ids.filter(routeId => {
                    let auxDate = (new Date(Date.parse(entities[routeId].date)));
                    auxDate.setHours(0,0,0,0);
                    
                    return auxDate.getTime() === filtroSimplicado.getTime()
                
                })
            }
        }else{
            filteredIds = [...ids]
            if (filterDate !== '' && filterDate !== null  ) {
                filteredIds = ids.filter(routeId => {
                    let auxDate = (new Date(Date.parse(entities[routeId].date)));
                    auxDate.setHours(0,0,0,0);
                   
                    return auxDate.getTime() === filtroSimplicado.getTime()
                
                })
            }
        }

        const tableContent = ids?.length && filteredIds.slice(page*10-10, page*10).map(routeId => <Route key={routeId} routeId={routeId} />)  

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
            <Container>      
                <br/>
                <div id="fondoTablaFiltro">
                        <InputGroup.Text>
                        &nbsp; &nbsp; <DatePicker className="filtroFiltrar form-control" placeholder="Filtrar" selected={filterDate} onChange={onChangeText} dateFormat="dd/MM/yyyy" locale="es"/>
                        &nbsp; &nbsp;
                        <strong className="tituloCheck">Mostrar recorridos completados: </strong>

                            <InputGroup.Checkbox
                                placeholder="Mostrar usuarios inactivos"
                                className="filterActives"
                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                value={viewCompleted}
                                onChange={onActiveChanged}

                            /></InputGroup.Text>     
                    </div>

                <div id="fondoTabla">
                    
                    <Table  striped bordered hover size="sm" className="table tableRoutes">
                        <thead>
                            <tr> 
                                <th>Estado</th>                            
                                <th>Fecha</th>                                    
                                <th>Hora</th>
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
        )
    }

    return content
}
export default RoutesList