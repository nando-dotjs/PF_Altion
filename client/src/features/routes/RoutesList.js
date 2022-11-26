import { useGetRoutesQuery } from "./routesApiSlice"
import Route from './Route'
import useAuth from "../../hooks/useAuth"
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

const RoutesList = () => {

    const { mail, isAdmin } = useAuth()
    registerLocale('es', es)

    const [viewCompleted, setViewCompleted] = useState(true)
    const [filterDate, setFilterDate] = useState('')

    const handleViewCompleted = (e) => setViewCompleted(e.target.value)
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

        const tableContent = ids?.length && filteredIds.map(routeId => <Route key={routeId} routeId={routeId} />)  
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
            </Container>
        )
    }

    return content
}
export default RoutesList