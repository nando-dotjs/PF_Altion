import { useGetZonesQuery } from "./zonesApiSlice"
import Zone from './Zone'
import useTitle from "../../hooks/useTitle"
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import InputGroup from 'react-bootstrap/InputGroup';

const ZonesList = () => {
    
    const [filtroTexto, setTexto] = useState('')
    const [viewInactives,setViewInactives] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    useTitle('Lista de Zonas')

    const onChangeText = e => setTexto(e.target.value)
    const onActiveChanged = e => setViewInactives(!viewInactives)
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
        if (viewInactives){
            filteredIds = [...ids]
            if (filtroTexto !==  ''){
                filteredIds = ids.filter(zoneId => (entities[zoneId].name.toUpperCase()+' '+entities[zoneId].details.toUpperCase()).includes(filtroTexto.toUpperCase()))
            }    
        }else {
            filteredIds = ids.filter(zoneId => (entities[zoneId].active===true))
            if (filtroTexto !==  ''){
                filteredIds = ids.filter(zoneId => (entities[zoneId].name.toUpperCase()+' '+entities[zoneId].details.toUpperCase()).includes(filtroTexto.toUpperCase()) && entities[zoneId].active ===true)
            } 
        }

        const tableContent = ids?.length && filteredIds.map(zoneId => <Zone key={zoneId} zoneId={zoneId} />)
         
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };


        content = (
            <>
          <Container>

          <br/>
            <div id="fondoTabla">
                <InputGroup.Text>
                &nbsp; &nbsp; <input className="form-control" placeholder="Filtrar" value={filtroTexto} onChange={onChangeText} type="text"></input>
                &nbsp; &nbsp;
                <strong>Mostrar zonas inactivas: </strong>
                    <InputGroup.Checkbox
                        placeholder="Mostrar zonas inactivas"
                        className="filterActives"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        value={viewInactives}
                        onChange={onActiveChanged}
                    /></InputGroup.Text>     
            </div>
            <div id="fondoTabla">
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