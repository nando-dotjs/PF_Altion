import { useState } from "react"
import { useAddNewRouteMutation } from "./routesApiSlice"
import  useAuth  from '../../hooks/useAuth'
import Select from "react-select";
import {Container, Form } from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import useTitle from "../../hooks/useTitle"
import { useGetZonesQuery } from "../zones/zonesApiSlice"
import { useGetDriversQuery } from "../drivers/driversApiSlice"
import DragList from "./DragList";
import {useGetPointsQuery} from '../points/pointsApiSlice'
import RouteMapContainer from '../maps/RouteMapContainer'
import Swal from 'sweetalert2'
import {useGetUsersQuery} from '../users/usersApiSlice'


const NewRouteForm = () => {

    const { mail, isAdmin, isCEV, isEmpresa } = useAuth()

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
    const [selectedZones, setSelectedZones] = useState([]);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [routeMap, setRouteMap] = useState('');
    const [activeUser, setActiveUser] = useState('');
    const [horas, setHoras] = useState([{"name":'Mañana'}, {"name":'Tarde'}, {"name":'Noche'}])
 
    const onDriverChanged = e => setDriver(e)
    const onZoneChanged = e => setSelectedZones(e)
    const onTimeChanged = e => setTime(e)

    const errClass = isError ? "errmsg" : "offscreen"
    
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

    // let zonesList
    // let zoneList = []

    // const loadZones = (zone) => {
    //     if (zoneList?.length > 0) {
    //         let z = zoneList.findIndex(e => e._id === zone._id)
    //         if (z === -1){
    //             zoneList.push(zone)
    //         }else{
    //             zoneList.splice(z, 1)
    //         } 
    //     }else{
    //         zoneList.push(zone)
    //     }
    //     console.log(zoneList)
    // }

    // if (zonesisLoading) zonesList = <p>Cargando...</p>

    // if (zonesisError) {
    //     zonesList = <p className="errmsg">{zoneserror?.data?.message}</p>
    // }

    // if (zonesisSuccess) {

    //     const { ids } = zones

    //     const tableContent = ids?.length && ids.map(zoneId => <Zone key={zoneId} zoneId={zoneId} selectedZones={e => loadZones(e)} />)  
    //     zonesList = (
    //         <Table className="table tableZones" bordered hover>
    //             <thead className="tableThead">
    //                 <tr>
    //                     <th scope="col" className="tableTh zoneCheck">Selec.</th>
    //                     <th scope="col" className="tableTh zoneName">Zona</th>
    //                     <th scope="col" className="tableTh zoneDetails">Detalles</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {tableContent}
    //             </tbody>
    //         </Table>
    //     )
    // }

    //Nueva lógica de Zonas para react-select

    let zonesJSON = {}
    zonesisSuccess ? zonesJSON = zones.entities : zonesJSON = {}

    let zonesList = []
    for(var i in zonesJSON){
        zonesList.push(zonesJSON[i]);
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
    for(var d in driversJSON){
        drivers.push(driversJSON[d]);
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
    for(var o in pointsJSON){
        points.push(pointsJSON[o]);
    }
    
    let filteredPoints = []

    const filterPoints = (e) => {

        e.preventDefault()

        filteredPoints = []
        for(var z in selectedZones){
            for(var p in pointsJSON){
               if(pointsJSON[p].zone === selectedZones[z].name){
                    filteredPoints.push(pointsJSON[p])
               }
            }
        }
        
        setChargedList(
            <DragList points={filteredPoints} setSelectedPoints={setSelectedPoints}/>
        )

    }

    

    const prepareMap = (e) => {
        e.preventDefault()
        setRouteMap(
            <RouteMapContainer points={selectedPoints}/>
        )
    }

    const {
        data: users,
        isLoading: usersisLoading,
        isSuccess: usersisSuccess,
        isError: usersisError,
        error: userserror
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const onSaveRouteClicked = async (e) => {
        e.preventDefault()

        if((isAdmin || isCEV || isEmpresa)) {
            for(var u in users.entities) {
                if (users.entities[u].mail === mail) {
                    setActiveUser(users.entities[u])
                }

            }
            let pointlist = []
            
            for(var k in selectedPoints){
                pointlist.push({"point":selectedPoints[k]});
            } 

            let selectedTime = time.name

            await addNewRoute({ "date":startDate, "time":selectedTime, "zones":selectedZones, "points":pointlist, driver, "createdBy":activeUser })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                          })
                    }else{
                        Toast.fire({
                            icon: 'success',
                            title: response.data.message
                          })
                    }
                })
        }
    }


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <Container fluid>

                <section>

                    <main className='newRoute'>

                        {/* <p className={errClass}>{error?.data?.message}</p> */}
                        <form className="form">

                            
                            <div className="container-fluid">
                                <div className="row">
                                    <Form.Label>Fecha del Recorrido</Form.Label>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" locale="es"/>
                                </div>
                                <div className="row">
                                    <Form.Label>Hora del Recorrido</Form.Label>
                                    <Select
                                    id="time"
                                    name="horario"
                                    className={`formSelect`}
                                    value={time}
                                    options={horas}
                                    onChange={onTimeChanged}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.name}/>
                                </div>
                                <br/>
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
                                        onChange={onZoneChanged}
                                        getOptionLabel={(option) => option.name + ' - ' + option.details}
                                        getOptionValue={(option) => option._id}
                                        isMulti
                                    >
                                    </Select>

                                </div>

                                <button type="button" className="btn btn-primary" onClick={e => filterPoints(e)}>
                                        Seleccionar Zonas
                                </button>

                                <div className="scrollableList">
                                    {chargedList}
                                </div>

                                <button className={'btn btn-success'} onClick={e => prepareMap(e)}>
                                Visualizar Recorrido
                                </button>
                                

                                {routeMap}

                                <button className={'btn btn-success'} onClick={(e) => onSaveRouteClicked(e)}>
                                    Confirmar Recorrido
                                </button>
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