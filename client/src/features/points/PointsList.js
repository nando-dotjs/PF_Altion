import { useGetPointsQuery } from "./pointsApiSlice"
import Point from "./Point"
import useAuth from "../../hooks/useAuth"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';

const PointsList = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const { username, isAdmin } = useAuth()
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
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(pointId => entities[pointId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(pointId => <Point key={pointId} pointId={pointId} />)
        const handleClose = () => {
            setShow(true)
            navigate('/dash');
        };


        content = (
            <>
                <Modal show={!show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="cabezal"><strong>Lista de Puntos</strong></Modal.Title>
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
export default PointsList