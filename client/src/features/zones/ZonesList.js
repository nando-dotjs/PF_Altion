import { useGetZonesQuery } from "./zonesApiSlice"
import Zone from './Zone'
import useTitle from "../../hooks/useTitle"
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";

const ZonesList = () => {
    
    const [filtroTexto, setTexto] = useState('')
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    useTitle('Lista de Zonas')

    const onChangeText = e => setTexto(e.target.value)
    const {
        data: zones,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetZonesQuery('zonesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = zones

        let filteredIds
        filteredIds = [...ids]
        if (filtroTexto !=  ''){
            filteredIds = ids.filter(zoneId => entities[zoneId].name.includes(filtroTexto))
        }    

        const tableContent = ids?.length && filteredIds.map(zoneId => <Zone key={zoneId} zoneId={zoneId} />)
         
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };


        content = (
            <>
          <br/>
          <Container>
        <div id="fondoTabla">
        <input className="filterZone" value={filtroTexto} onChange={onChangeText} type="text"/>
            <Table striped bordered hover size="sm" className="table tableUsers">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh zoneName">Nombre</th>
                        <th scope="col" className="tableTh zoneDetails">Detalles</th>
                        <th scope="col" className="tableTh zoneEdit">Acciones</th>
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
export default ZonesList