import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewRouteMutation } from "./routesApiSlice"
import  useAuth  from '../../hooks/useAuth'
import Select from "react-select";
import {Container, Form, ProgressBar, Label, Table } from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import useTitle from "../../hooks/useTitle"
import { useGetZonesQuery } from "../zones/zonesApiSlice"
import Zone from "./Zone"
import { useGetDriversQuery } from "../drivers/driversApiSlice"
import DragList from "./DragList";
import {useGetPointsQuery} from '../points/pointsApiSlice'
import RouteMapContainer from '../maps/RouteMapContainer'



const NewRouteForm = () => {

    const { username, isAdmin, isCEV, isEmpresa } = useAuth()

    const [addNewRoute, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewRouteMutation()


    useTitle('Nuevo Recorrido')
    registerLocale('es', es)

    const {
        data: zones,
        isLoading: zonesisLoading,
        isSuccess: zonesisSuccess,
        isError: zonesisError,
        error: zoneserror
    } = useGetZonesQuery('zonesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [driver, setDriver] = useState({_id:'', name: '', surname: ''});
    const [chargedList, setChargedList] = useState('');
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [routeMap, setRouteMap] = useState('');

    const onDriverChanged = e => setDriver(e)


    const onSaveRouteClicked = async (e) => {
        e.preventDefault()

    let labelSelector = null
    let selectorAdmin = null
    let input = null

    }
    const errClass = isError ? "errmsg" : "offscreen"
    
    let zonesList
    let zoneList = []

    const loadZones = (zone) => {
        if (zoneList?.length > 0) {
            let z = zoneList.findIndex(e => e._id === zone._id)
            if (z === -1){
                zoneList.push(zone)
            }else{
                zoneList.splice(z, 1)
            } 
        }else{
            zoneList.push(zone)
        }
        console.log(zoneList)
    }

    if (zonesisLoading) zonesList = <p>Cargando...</p>

    if (zonesisError) {
        zonesList = <p className="errmsg">{zoneserror?.data?.message}</p>
    }

    if (zonesisSuccess) {

        const { ids } = zones

        const tableContent = ids?.length && ids.map(zoneId => <Zone key={zoneId} zoneId={zoneId} selectedZones={e => loadZones(e)} />)  
        zonesList = (
            <Table className="table tableZones" bordered hover>
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh zoneCheck">Selec.</th>
                        <th scope="col" className="tableTh zoneName">Zona</th>
                        <th scope="col" className="tableTh zoneDetails">Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </Table>
        )
    }

    const {
        data: driversList,
        isLoading: driversisLoading,
        isSuccess: driversisSuccess,
        isError: driversisError,
        error: driverserror
    } = useGetDriversQuery('driversList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let driversJSON = {}
    driversisSuccess ? driversJSON = driversList.entities : driversJSON = {}

    let drivers = []
    for(var i in driversJSON){
        drivers.push(driversJSON [i]);
    }


    const {
        data: pointsList,
        isLoading: pointsisLoading,
        isSuccess: pointsisSuccess,
        isError: pointsisError,
        error: pointsserror
    } = useGetPointsQuery('pointsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let pointsJSON = {}
    pointsisSuccess ? pointsJSON = pointsList.entities : pointsJSON = {}

    let points = []
    for(var i in pointsJSON){
        points.push(pointsJSON [i]);
    }
    
    let filteredPoints = []

    const filterPoints = (e) => {

        e.preventDefault()
        filteredPoints = []
        for(var z in zoneList){
            for(var p in pointsJSON){
               if(pointsJSON[p].zone === zoneList[z].name){
                    filteredPoints.push(pointsJSON[p])
               }
            }
        }
        
        setChargedList(
            <DragList points={filteredPoints} setSelectedPoints={setSelectedPoints}/>
        )

    }

    

    const prepareMap = () => {
        setRouteMap(
            <RouteMapContainer points={selectedPoints}/>
        )
    }


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <Container fluid>

                <section>

                    <main className='newRoute'>

                        {/* <p className={errClass}>{error?.data?.message}</p> */}
                        <form className="form" onSubmit={onSaveRouteClicked}>

                            
                            <div className="container-fluid">
                                <div className="row">
                                    <Form.Label>Fecha del Recorrido</Form.Label>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" locale="es"/>
                                </div>
                                <div className="row">
                                    <Form.Label>Hora del Recorrido</Form.Label>
                                    <Form.Select
                                    id="time"
                                    name="horario"
                                    className={`formSelect`}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    >
                                        <option>Mañana</option>
                                        <option>Tarde</option>
                                        <option>Noche</option>
                                    </Form.Select>
                                </div>
                                <div className="row">
                                    {zonesList}
                                </div>

                                <button type="button" className="btn btn-primary" onClick={e => filterPoints(e)}>
                                        Seleccionar Rutas
                                </button>

                                <div className="row">
                                    <Form.Label>Chofer del Recorrido</Form.Label>
                                </div>
                                <div className="row">
                                    <Select
                                        id="driver"
                                        name="driver"
                                        options={drivers}
                                        className="formSelect"
                                        value={driver}
                                        onChange={onDriverChanged}
                                        getOptionLabel={(option) => option.name + ' ' + option.surname}
                                        getOptionValue={(option) => option._id}
                                    >
                                    </Select>
                                </div>
                                <br/>
                                <div className="scrollableList">
                                    {chargedList}
                                </div>

                                <button className={'btn btn-success'} onClick={() => prepareMap()}>
                                Confirmar Ruta
                                </button>
                                

                                {routeMap}
                            </div>
                        </form>
                    </main>
                </section>
                </Container>
        </>
    )

    return content
}

export default NewRouteForm