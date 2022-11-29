import "react-datepicker/dist/react-datepicker.css";

import {Button, Container, Form, Modal} from "react-bootstrap"
import { selectDriverById, useGetDriversQuery } from "../drivers/driversApiSlice"
import { selectRouteById, useUpdateRouteMutation } from "./routesApiSlice"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import DatePicker from "react-datepicker";
import DragList from "./DragList";
import RouteMapContainer from '../maps/RouteMapContainer'
import Select from "react-select";
import Swal from 'sweetalert2'
import es from 'date-fns/locale/es';
import { registerLocale } from  "react-datepicker";
import  useAuth  from '../../hooks/useAuth'
import {useGetPointsQuery} from '../points/pointsApiSlice'
import { useGetZonesQuery } from "../zones/zonesApiSlice"
import { useSelector } from 'react-redux'
import useTitle from "../../hooks/useTitle"

const EditRouteForm = () => {

    const { id } = useParams()

    const route = useSelector(state => selectRouteById(state, id))
    const routeDriver = useSelector(state => selectDriverById(state, route.driver))

    const { isAdmin, isCEV, isEmpresa, isRecolector } = useAuth()

    const [updateRoute] = useUpdateRouteMutation()

    const navigate = useNavigate()

    useTitle('Editar Recorrido')
    registerLocale('es', es)

    const {
        data: zones,
        isSuccess: zonesisSuccess
    } = useGetZonesQuery('zonesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: pointsList,
        isSuccess: pointsisSuccess
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
                for(var k in pointsList.ids){
                    if(pointsList.entities[pointsList.ids[k]]._id === route.points[j].point){
                        routePoints.push(pointsList.entities[pointsList.ids[k]])
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

    const [startDate, setStartDate] = useState(new Date(Date.parse(route.date)));
    const [time, setTime] = useState({"name":route.time});
    const [driver, setDriver] = useState(routeDriver);
    const [chargedList, setChargedList] = useState('');
    const [selectedZones, setSelectedZones] = useState(getZones());
    const [selectedPoints, setSelectedPoints] = useState(getPoints());
    const [routeMap, setRouteMap] = useState('');
    const [horas] = useState([{"name":'Mañana'}, {"name":'Tarde'}, {"name":'Noche'}])

    const onDriverChanged = e => setDriver(e)
    const onZoneChanged = e => setSelectedZones(e)
    const onTimeChanged = e => setTime(e)
    
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


    //Filtro de Zonas
    let filteredZones = []
    let zonesList = []
    if (zonesisSuccess) {
        filteredZones = zones.ids.filter(e => zones.entities[e].active === true)

        for(var d in filteredZones){
            zonesList.push(zones.entities[filteredZones[d]]);
        }
    }

    //Filtro de Choferes
    const {
        data: driversList,
        isSuccess: driversisSuccess
    } = useGetDriversQuery('driversList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let filteredDrivers = []
    let drivers = []
    if (driversisSuccess) {
        filteredDrivers = driversList.ids.filter(e => driversList.entities[e].active === true)

        for(var k in filteredDrivers){
            drivers.push(driversList.entities[filteredDrivers[k]]);
        }
    }
    
    //Filtro de Puntos
    const [filteredPoints, setFilteredPoints] = useState(getPoints());
    let pointsJSON = []
    let points = []    
    if (pointsisSuccess) {
        points = pointsList.ids.filter(e => pointsList.entities[e].completed === true)

        for(var o in points){
            pointsJSON.push(pointsList.entities[points[o]]);
        }
    }

    //Filtro de Puntos
    const filterPoints = (e) => {

        let AuxFilteredPoints = []
        for(var z in selectedZones){
            for(var p in pointsJSON){
               if(pointsJSON[p].zone === selectedZones[z].name){
                    AuxFilteredPoints.push(pointsJSON[p])
               }
            }
        }
        setFilteredPoints(AuxFilteredPoints)

    }

	useEffect( () => {
        if(filteredPoints.length > 0){
            setChargedList(<DragList points={filteredPoints} setSelectedPoints={setSelectedPoints}/>);
        }else{
            setChargedList('')
        }
	}, [filteredPoints]); 

    
    //Carga de Mapa

    useEffect( () => {
        if(selectedPoints.length > 0){
            setRouteMap(<RouteMapContainer points={selectedPoints}/>)
        }else{
            setRouteMap('')
        }
	}, [selectedPoints]); 

    const onSaveRouteClicked = async (e) => {
        e.preventDefault()



        if((isAdmin || isCEV || isEmpresa || isRecolector)) {
            let pointlist = []
            
            for(var k in selectedPoints){
                pointlist.push({"point":selectedPoints[k]});
            } 

            let selectedTime = time.name

            await updateRoute({id, "date":startDate, "time":selectedTime, "zones":selectedZones, "points":pointlist, driver })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                        })
                    }else{
                        Toast.fire({
                            icon: 'info',
                            title: response.data
                        })
                        navigate('/dash/routes');
                    }
                })
        }
       
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate('/dash/routes');
    };


    const content = (
        <>
            <Modal show={!show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="cabezal"><strong>Editar Recorrido</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>

                        <Container fluid>

                            <form className="form">
                                <div className="container-fluid">
                                    <div className="row">
                                        <Form.Label>Fecha del Recorrido</Form.Label>
                                        <DatePicker className="form-control form-control-fechaRecorrido" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" locale="es"/>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <Form.Label>Hora del Recorrido</Form.Label>
                                        <Select
                                        id="time"
                                        name="horario"
                                        className={`formSelect`}
                                        placeholder={'Seleccione un horario...'}
                                        value={time}
                                        options={horas}
                                        onChange={onTimeChanged}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}/>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <Form.Label>Chofer del Recorrido</Form.Label>
                                        <Select
                                            id="driver"
                                            name="driver"
                                            options={drivers}
                                            className={`formSelect`}
                                            placeholder={'Seleccione chofer...'}
                                            value={driver}
                                            onChange={onDriverChanged}
                                            getOptionLabel={(option) => option.name + ' ' + option.surname}
                                            getOptionValue={(option) => option._id}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className="container-fluid">         

                                    <br/>
                                    <div className="row">
                                        <Form.Label>Zona/s del Recorrido</Form.Label>
                                    </div>
                                    <div className="row">
                                        <Select
                                            id="zone"
                                            name="zone"
                                            options={zonesList}
                                            className="formSelect"
                                            value={selectedZones}
                                            placeholder={'Seleccione zona...'}
                                            onChange={onZoneChanged}
                                            getOptionLabel={(option) => option.name + ' - ' + option.details}
                                            getOptionValue={(option) => option._id}
                                            isMulti
                                        >
                                        </Select>

                                    </div>                      
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={e => filterPoints(e)}>
                                            Seleccionar Zonas
                                    </button>
                                    <br/>
                                    <br/>
                                    <div className="scrollableList">
                                        {chargedList}
                                    </div>
                                    
                                    <br/>
                                    {routeMap}
                                    
                                </div>
                                <br/>
                              
                            </form>
                            {/* <div className="row">
                                <div className="col"> */}
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    {/* <button className={'btn btn-light'} onClick={() => handleClose()}> */}
                                        Cancelar
                                    </Button>
                                {/* </div> */}
                                {/* <div className="col"> */}
                                    <Button variant="primary" onClick={onSaveRouteClicked}>
                                        Confirmar
                                    </Button>
                            </Modal.Footer>
                        </Container>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )

    return content
}

export default EditRouteForm