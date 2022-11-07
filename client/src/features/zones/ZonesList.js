import { useGetZonesQuery } from "./zonesApiSlice"
import Zone from './Zone'
import useTitle from "../../hooks/useTitle"
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const ZonesList = () => {
    
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    useTitle('Lista de Zonas')

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

        const { ids } = zones

        const tableContent = ids?.length && ids.map(zoneId => <Zone key={zoneId} zoneId={zoneId} />)
         
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };


        content = (
            <>
            <Modal show={!show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="cabezal"><strong>Lista de Zonas</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
          {/* <Button variant="primary" onClick={onSaveUserClicked} disabled={!validUsername || !validPassword || !validMatch ? true : false}>
           Registrar
          </Button> */}
        </Modal.Footer>
      </Modal>
        </>
        )
    }

    return content
}
export default ZonesList