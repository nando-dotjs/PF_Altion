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

const DriversList = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    useTitle('Lista de Choferes')

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

        const { ids } = drivers

        const tableContent = ids?.length && ids.map(driverId => <Driver key={driverId} driverId={driverId} />)
       
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };



        content = (
            <>
            <Modal show={!show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="cabezal"><strong>Lista de Choferes</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
            <Container>
                  
                 {/* <section className="welcome">
                        <div id="fechaDiv" className="">

                            <p>{today}</p>

                        </div>
                    </section> */}
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
export default DriversList