import { useGetRoutesQuery } from "./routesApiSlice"
import Route from './Route'
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import {Table, Container} from 'react-bootstrap';
import {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
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
        <div class="loader"></div>
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

        const { ids } = routes
    	
        const tableContent = ids?.length && ids.map(routeId => <Route key={routeId} routeId={routeId} />)  
        content = (
            <Container>      
                <br/>
                <div id="fondoTabla">
                        <InputGroup.Text>
                        &nbsp; &nbsp; <input className="filtroFiltrar form-control" placeholder="Filtrar" selected={filterDate} onChange={(date) => setFilterDate(date)} dateFormat="dd/MM/yyyy" locale="es"/>
                        &nbsp; &nbsp;
                        <strong class="tituloCheck">Mostrar recorridos completados: </strong>

                            <InputGroup.Checkbox
                                placeholder="Mostrar usuarios inactivos"
                                className="filterActives"
                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                value={viewCompleted}
                                onChange={e => handleViewCompleted(e)}

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