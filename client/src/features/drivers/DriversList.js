import { useGetDriversQuery } from "./driversApiSlice"
import Driver from './Driver'
import useTitle from "../../hooks/useTitle"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import '../users/register.css'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const DriversList = () => {

    const [filtroTexto, setTexto] = useState('');
    const [viewInactives,setViewInactives] = useState(false);
    const [show, setShow] = useState(false);
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
    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)


    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
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

        const tableContent = ids?.length && filteredIds.map(driverId => <Driver key={driverId} driverId={driverId} />)
       
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };



        content = (
            <>
         
            <Container>
            <br />
                    <div id="fondoTabla">
                        <br />
                        <InputGroup.Text>
                        &nbsp; &nbsp; <input className="form-control" placeholder="Filtrar" value={filtroTexto} onChange={onChangeText} type="text"></input>
                        &nbsp;
                        &nbsp;
                       <strong>Mostrar choferes inactivos: </strong>
                            <InputGroup.Checkbox
                                placeholder="Mostrar usuarios inactivos"
                                className="filterActives"
                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                value={viewInactives}
                                onChange={onActiveChanged}
                            /></InputGroup.Text>
                        <br />
                    </div>
                    <br />
              
            <div id="fondoTabla">
            
            <Table striped bordered hover size="sm" className="table tableUsers">
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
        </Container>
       
            </>
        )
    }

    return content
}
export default DriversList