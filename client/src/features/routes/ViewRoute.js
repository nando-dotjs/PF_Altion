import "react-datepicker/dist/react-datepicker.css";

import {Card, Col, Container, Modal, Row, Table} from "react-bootstrap"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import { CSVLink } from "react-csv";
import PointView from './PointView'
import RouteMapContainer from '../maps/RouteMapContainer'
import es from 'date-fns/locale/es';
import { registerLocale } from  "react-datepicker";
import { selectDriverById } from "../drivers/driversApiSlice"
import { selectRouteById } from "./routesApiSlice"
import { useGetPointsQuery } from '../points/pointsApiSlice'
import { useGetZonesQuery } from "../zones/zonesApiSlice"
import { useSelector } from 'react-redux'
import useTitle from "../../hooks/useTitle"

const ViewRoute = () => {

    let headers = [
        { label: "Nombre",      key: "point.name" },
        { label: "Estado",      key: "collected" },
        { label: "Hora visita", key:"timeCollected" },
        { label: "Bolsones",    key: "amountCollected" },
        { label: "Detalle",     key: "details"}
      ];



    const { id } = useParams()

    const route = useSelector(state => selectRouteById(state, id))
    const routeDriver = useSelector(state => selectDriverById(state, route.driver))

    const navigate = useNavigate()

    useTitle('Ver Recorrido')
    registerLocale('es', es)

    const {
        data: zones,
        isSuccess: zonesisSuccess,
    } = useGetZonesQuery('zonesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: points,
        isSuccess: pointsisSuccess,
    } = useGetPointsQuery('pointsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const getZones = () => {
        let routeZones = []
        if(zonesisSuccess){
            for(var j in route.zones) {
                for(var k in zones.ids){
                    if(zones.entities[zones.ids[k]]._id === route.zones[j]){
                        routeZones.push(zones.entities[zones.ids[k]])
                    }
                }
            }
        }
        return routeZones
    }

    useEffect(() => {
        if(zonesisSuccess){
            setSelectedZones(getZones())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zonesisSuccess])

    const getPoints = () => {
        let routePoints = []
        if(pointsisSuccess){
            for(var j in route.points) {
                for(var k in points.ids){
                    if(points.entities[points.ids[k]]._id === route.points[j].point){
                        routePoints.push(points.entities[points.ids[k]])
                    }
                }
            }
        }
        return routePoints
    }

    

    useEffect(() => {
        if(pointsisSuccess){
            setSelectedPoints(getPoints())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pointsisSuccess])

    const [pointsList] = useState(route.points)
    const [startDate] = useState(new Date(Date.parse(route.date)));
    const [time] = useState({"name":route.time});
    const [selectedZones, setSelectedZones] = useState(getZones());
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [routeMap, setRouteMap] = useState('');
    const [zonesText, setZonesText] = useState('');
    const [selectedPoint, setSelectedPoint] = useState('')

    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    
    const csvPoints = () => {
        let pointCSV = []
        for(var x in route.points){
            for(var y in selectedPoints){
                if(route.points[x].point===selectedPoints[y]._id){
                    pointCSV.push({
                        point:selectedPoints[y],
                        details:route.points[x].details,
                        collected:route.points[x].collected,
                        amountCollected:route.points[x].amountCollected,
                        timeCollected:route.points[x].timeCollected,
                    })
                }
            }
        }
        return pointCSV
    }
    
    //Texto Zonas
    useEffect(() => {
        let auxText = ''
        for (var z in selectedZones){
            if(+z === (selectedZones.length-1)){
                auxText = auxText.concat(' ', selectedZones[z].name)
            }else{
                auxText = auxText.concat(' ', selectedZones[z].name, ',')
            }
            
        }

        setZonesText(auxText)
    }, [selectedZones])
    
    //Carga de Mapa
    useEffect( () => {
        if(selectedPoints.length > 0){
            setRouteMap(<RouteMapContainer points={selectedPoints}/>)
        }else{
            setRouteMap('')
        }
	}, [selectedPoints]); 

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate('/dash/routes');
    };

    const pointState = p => {
        for (let n in pointsList){
            if(pointsList[n].point === p){
                return pointsList[n].collected
            }
        }
    } 

    const pointDetails = p => {
        for (let n in pointsList){
            if(pointsList[n].point === p){
                return pointsList[n]
            }
        }
    } 

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handlePoints = (p) => {
        if(p !== ''){
            setSelectedPoint(p)
            handleShowModal()
        }
    }

    const tableContent = pointsList?.length && pointsList.map(p => <PointView key={p.point} pointId={p.point} pointState={pointState(p.point)} amountCollected={p.amountCollected} handlePoint={e => handlePoints(e)}/>)  

    const content = (
        <>
            <Modal show={!show} onHide={handleClose} backdrop="static" keyboard={false} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title id="cabezal"><strong>Datos del Recorrido</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <form className="form">
                                        <div className="container-fluid">
                                            <Card>
                                                <Card.Header>Fecha del Recorrido</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {startDate.getDate()} de {months[startDate.getMonth()]} de {startDate.getFullYear()}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card>
                                                <Card.Header>Hora del Recorrido</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {time.name}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card>
                                                <Card.Header>Chofer del Recorrido</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {routeDriver.name} {routeDriver.surname}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="container-fluid">       
                                            <br/>  
                                            <Card>
                                                <Card.Header>Zonas del Recorrido</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {zonesText}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card>
                                                <Card.Header>Recorrido realizado</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {routeMap}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <br/>
                                    </form>
                                </Col>
                                <Col>
                                    <h2>Puntos visitados</h2>
                                    <Table striped bordered hover size="sm" className="table tableRoutes">
                                        <thead className="tableThead">
                                            <tr> 
                                                <th>Nombre</th> 
                                                <th>Estado</th>                                   
                                                <th>Bolsones</th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableContent}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Modal.Footer>
                                <CSVLink 
                                    headers={headers}
                                    data={csvPoints()} 
                                    separator={";"} 
                                    filename={`${startDate.getDate()}-${startDate.getMonth()+1}-${startDate.getFullYear()}_${time.name}.csv`}
                                    className='btn btn-success'
                                    target='_blank'
                                    >
                                        Descargar Detalle
                                </CSVLink>   
                                <Button variant="secondary" onClick={handleClose}>
                                        Volver
                                </Button>
                            </Modal.Footer>
                        </Container>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPoint.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Card>
                            <Card.Header>Estado</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {pointState(selectedPoint._id)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card>
                            <Card.Header>Hora de recolección</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {pointDetails(selectedPoint._id)?.timeCollected}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        
                        <Card>
                            <Card.Header>Cantidad de Bolsones Recolectados</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {pointDetails(selectedPoint._id)?.amountCollected}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card>
                            <Card.Header>Detalle</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {pointDetails(selectedPoint._id)?.details}
                                </Card.Text>
                            </Card.Body>
                        </Card>      
                    </Container>             
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>    
        </>
    )

    return content
}

export default ViewRoute