import { useGetRoutesQuery } from "./routesApiSlice"
import Route from './Route'
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import {Table, Spinner, Container} from 'react-bootstrap';
import {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import InputGroup from 'react-bootstrap/InputGroup';

const RoutesList = () => {

    const { mail, isAdmin } = useAuth()
    registerLocale('es', es)

    const [viewCompleted, setViewCompleted] = useState(true)
    const [filterDate, setFilterDate] = useState('')

    const handleViewCompleted = (e) => setViewCompleted(e.target.value)

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
        <div>
            <Table className="table tableRoutes">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh routeDate">Fecha</th>
                        <th scope="col" className="tableTh routeTime">Hora</th>
                        <th scope="col" className="tableTh routeState">Estado</th>
                        <th scope="col" className="tableTh routeEdit">Editar</th>
                    </tr>
                </thead>
            </Table>    
            <Spinner animation="border" role="status"> </Spinner>
            <br/>
            <span className="sr-only">Cargando...</span>`
        </div>
    )

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = routes
    	
        const tableContent = ids?.length && ids.map(routeId => <Route key={routeId} routeId={routeId} />)  
        content = (
            <Container>      
                <br/>
                <div id="fondoTabla">
                        <InputGroup.Text>
                        &nbsp; &nbsp; <input className="form-control" placeholder="Filtrar" selected={filterDate} onChange={(date) => setFilterDate(date)} dateFormat="dd/MM/yyyy" locale="es"/>
                        &nbsp; &nbsp;
                        <strong>Mostrar recorridos completados: </strong>

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
                {/* <div className={'row'}>
                    <div className={'col'}>
                        <DatePicker className={'form-control input-sm'} selected={filterDate} onChange={(date) => setFilterDate(date)} dateFormat="dd/MM/yyyy" locale="es" placeholder={"Filtro fecha"}/>
                    </div>
                    <br/>
                    <div className={'col'}>
                        {(isAdmin) && <label>Mostrar recorridos completados: </label>}
                        {(isAdmin) && <input
                            className="filterActives"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            value={viewCompleted}
                            onChange={e => handleViewCompleted(e)}
                        />}
                    </div>
                </div> */}

                    <Table  striped bordered hover size="sm" className="table tableUsers">
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