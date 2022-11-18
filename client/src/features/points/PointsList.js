import { useGetPointsQuery } from "./pointsApiSlice"
import Point from "./Point"
import useAuth from "../../hooks/useAuth"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ChangeEvent } from "react";
import useTitle from "../../hooks/useTitle"

const PointsList = () => {

    const [filtroTexto, setTexto] = useState('');
    const [viewInactives,setViewInactives] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    useTitle('Lista de Puntos')
    const onChangeText = e => setTexto(e.target.value)
    const onActiveChanged = e => setViewInactives(!viewInactives)

    const { mail, isAdmin } = useAuth()
    const {
        data: points,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPointsQuery('pointsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)


    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }
    
    if (isSuccess) {
        const { ids, entities } = points

        let filteredIds
        let filtroPrendido
        if (isAdmin) {
            if (viewInactives){
                filteredIds = [...ids]
                if (filtroTexto !==  ''){
                    filteredIds = ids.filter(pointId => (entities[pointId].name.toUpperCase()+' '+entities[pointId].zone?.toUpperCase()).includes(filtroTexto.toLocaleUpperCase()))
                    filtroPrendido = true
                } 
            }else{
                filteredIds = ids.filter(userId => (entities[userId].completed===true))
                if (filtroTexto !==  ''){
                    filteredIds = ids.filter(pointId => (entities[pointId].name.toUpperCase()+' '+entities[pointId].zone?.toUpperCase()).includes(filtroTexto.toLocaleUpperCase())&& entities[pointId].completed ===true)
                    filtroPrendido = true
                } 
            }   
        } else {
            filteredIds = ids.filter(pointId => entities[pointId].mail === mail)
            if (filtroTexto !==  ''){
                filteredIds = ids.filter(pointId => (entities[pointId].name.toUpperCase()+' '+entities[pointId].zone?.toUpperCase()).includes(filtroTexto.toLocaleUpperCase()) && entities[pointId].mail === mail)
                filtroPrendido = true
            }
        }

        const tableContent = ids?.length && filteredIds.map(pointId =>  <Point key={pointId} pointId={pointId} />)
        
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };

        if (!filtroPrendido && filteredIds.length === 0) {
            content = <p className="errmsg">No se encontraron puntos para este usuario.</p>
        }else{
        content = (
            <>
                <br />
                        <Container>     
                                               
                            <div id="fondoTabla">
                            <label>Filtrar: </label>
                            <input className="filterPoint" value={filtroTexto} onChange={onChangeText} type="text"/>
                            &nbsp;
                            &nbsp;
                            {(isAdmin) && <label>Mostrar puntos pendientes: </label>}
                            {(isAdmin) && <input
                                    className="filterActives"
                                    id="user-active"
                                    name="user-active"
                                    type="checkbox"
                                    value={viewInactives}
                                    onChange={onActiveChanged}
                                />}
                                <Table  striped bordered hover size="sm" className="table tableUsers">
                                    <thead>
                                        <tr>
                                            <th>Estado</th>                                    
                                            <th>Nombre</th>
                                            <th>Zona</th>
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

        )}
    }

    return content
}
export default PointsList