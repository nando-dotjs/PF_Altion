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

const PointsList = () => {

    const [filtrotexto, setTexto] = useState('');
    const [filtro, setFiltro] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const onChangeText = e => setTexto(e.target.value)

  
    useEffect(() => {
        console.log(filtrotexto)
    }, [filtrotexto]);




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
    console.log(points)
    if (isSuccess) {
        const { ids, entities } = points

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
            if (filtrotexto !=  ''){
                filteredIds = ids.filter(pointId => entities[pointId].name.includes(filtrotexto))
            }    
        } else {
            filteredIds = ids.filter(pointId => entities[pointId].mail === mail)
            if (filtrotexto !=  ''){
                filteredIds = ids.filter(pointId => entities[pointId].name.includes(filtrotexto) && entities[pointId].mail === mail)
            }
        }

        const tableContent = ids?.length && filteredIds.map(pointId =>  <Point key={pointId} pointId={pointId} />)

        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };


        content = (
            <>
                <br />
                        <Container>     
                                               
                            <div id="fondoTabla">
                            <input className="filterPoint" value={filtrotexto} onChange={onChangeText} type="text"/>
                                <Table  striped bordered hover size="sm" className="table tableUsers">
                                    <thead>
                                        <tr>
                                            <th>Estado</th>
                                            <th>Creado</th>
                                            <th>Zona</th>
                                            <th>Nombre</th>
                                            <th>Propietario</th>
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
export default PointsList