import './initRoute.css';

import {Button, Container, Modal, Table} from 'react-bootstrap';
import { selectRouteById, useUpdatePointsMutation, useUpdateStateMutation } from './routesApiSlice'
import { useNavigate, useParams } from 'react-router-dom'

import Point from './Point'
import React from 'react'
import Swal from "sweetalert2"
import { useSelector } from 'react-redux'

const InitRoute = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const route = useSelector(state => selectRouteById(state, id))

    const [pointsList, setPointsList] = React.useState(route.points)
    const [collected, setCollected] = React.useState('')
    const [selectedPoint, setSelectedPoint] = React.useState('')
    const [pointDetails, setPointDetails] = React.useState('')
    const [amountCollected, setAmountCollected] = React.useState(0)

    const handleAmount = e => setAmountCollected(e.target.value)

    const [updatePoints] = useUpdatePointsMutation()


    const [updateState] = useUpdateStateMutation()
    

    const savePoints = () => {

        const current = new Date();
        const time = current.toLocaleTimeString("es-UY");
        let auxArray = [...pointsList]
        for (let o in auxArray) {
            if (auxArray[o].point === selectedPoint._id) {
                auxArray[o] = {point: selectedPoint._id, collected, amountCollected, details:pointDetails, timeCollected: time}
            }
        }
            
            if(collected==='Recolectado'){
                if(+amountCollected>0){
                    setPointsList(auxArray)
                    handleClose()
                }else{  
                    Toast.fire({
                        icon: 'error',
                        title: 'La cantidad de bolsones debe ser mayor a 0'
                    })
                }
            }else{
                
                if(+amountCollected===0){
                    setPointsList(auxArray)
                    handleClose()
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'La cantidad de bolsones debe ser 0'
                    })
                }
            }
       

    } 

    const handlePoints = (p) => {
        if(p !== ''){
            setSelectedPoint(p)
            handleShow()
        }
    }

    React.useEffect(() => {
        onSavePointsClicked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pointsList])

    React.useEffect(() => {

        for (let n in pointsList){
            if(pointsList[n].point === selectedPoint._id){
                pointsList[n].collected ? setCollected(pointsList[n].collected) : setCollected('')
                pointsList[n].amountCollected ? setAmountCollected(pointsList[n].amountCollected) : setAmountCollected(0)
                pointsList[n].details ? setPointDetails(pointsList[n].details) : setPointDetails('')
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPoint])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

    const onSavePointsClicked = async (e) => {
            await updatePoints({ id, points: pointsList}) 
    }

    const onConfirmClicked = async (e) => {

        await updateState({id, routeState:"Completado"})
            .then((response) => {
                    console.log(response)
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error
                        })
                    } else {
                        Toast.fire({
                            icon: 'info',
                            title: response.data
                          })
                        navigate('/dash/routes')
                    }
            })

    }

    const onBackClicked = e => navigate('/dash/routes')

    const pointState = p => {
        for (let n in pointsList){
            if(pointsList[n].point === p){
                return pointsList[n].collected
            }
        }
    } 

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const tableContent = pointsList?.length && pointsList.map(p => <Point key={p.point} pointId={p.point} amount={p.amountCollected} pointState={pointState(p.point)} handlePoint={e => handlePoints(e)}/>)  

        const content = (
            
            <Container>         
                <br/>    
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{selectedPoint.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>¿Se recolectaron bolsones?</label>      
                        <br/>
                        <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" onChange={() => setCollected('Recolectado')} checked={collected === 'Recolectado'}/>
                        <label className="btn btn-outline-success" htmlFor="success-outlined">Si</label>
                        &nbsp;
                        <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" onChange={() => setCollected('Omitido')} checked={collected === 'Omitido'}/>
                        <label className="btn btn-outline-danger" htmlFor="danger-outlined">No</label>          
                        <br/>
                        <br/>
                        <label>Cantidad de Bolsones Recolectados</label>      
                        <br/>
                        <input className="form-control" type="number" name="myInput" value={amountCollected} onChange={handleAmount}/>
                        <br/>
                        <br/>
                        <label>Detalle (Opcional)</label>      
                        <br/>
                        <textarea className="form-control" rows="3" type="text" name="myInput" value={pointDetails} onChange={e => setPointDetails(e.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => savePoints()}>
                        Confirmar
                    </Button>
                    </Modal.Footer>
                </Modal>    
                <div id="fondoTabla">
                <Table striped bordered hover size="sm" className="table tableRoutes">
                    <thead className="tableThead">
                        <tr> 
                            <th>Punto</th> 
                            <th>Estado</th>                                   
                            <th>Información</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </Table>
                </div>
                <div className={'row'}>
                    <div className={'col-md-3'}>
                        <Button variant="secondary" onClick={e => onBackClicked(e)}>
                            Volver
                        </Button>
                        &nbsp;
                        <Button variant="primary" onClick={e => onConfirmClicked(e)}>
                            Finalizar
                        </Button>
                    </div>
                </div>    
            </Container>
        )

    return content
}

export default InitRoute