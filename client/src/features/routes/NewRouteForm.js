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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragList from "./DragList";
import {useGetPointsQuery} from '../points/pointsApiSlice'



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

    const filterPoints = () => {

        filteredPoints = []
        for(var z in zoneList){
            for(var p in pointsJSON){
               if(pointsJSON[p].zone === zoneList[z].name){
                    filteredPoints.push(pointsJSON[p])
               }
            }
        }
        
        setChargedList(
            <DragList points={filteredPoints}/>
        )
        console.log(chargedList)

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

                                <button type="button" className="btn btn-primary" onClick={filterPoints}>
                                        Launch modal
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

                                <div className="scrollableList">
                                    {chargedList}
                                </div>
                                

                                {/* <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <input
                                            className="form-control"
                                            placeholder="Nombre"
                                            type="text"
                                            id="name"
                                            autoComplete="off"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                        />
                                    </div>
                                    <label htmlFor="name" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                                    </label>
                                </div>
                            </div>
                            <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                2 a 15 caracteres.<br />
                                Debe empezar y contener solo letras.<br />
                            </p>
                            <br />
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">

                                        <input
                                            className="form-control"
                                            placeholder="Apellido"
                                            type="text"
                                            id="surname"
                                            autoComplete="off"
                                            onChange={(e) => setSurname(e.target.value)}
                                            value={surname}
                                            required
                                            aria-invalid={validSurname ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setSurnameFocus(true)}
                                            onBlur={() => setSurnameFocus(false)}
                                        />
                                    </div>
                                    <label htmlFor="surname" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                                    </label>

                                </div>
                            </div>
                            <p id="uidnote" className={surnameFocus && surname && !validSurname ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                2 a 15 caracteres.<br />
                                Debe empezar y contener solo letras.<br />
                            </p>
                            <br />
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <input
                                            className="form-control"
                                            placeholder="Correo Electrónico"
                                            type="text"
                                            id="mail"
                                            autoComplete="off"
                                            onChange={(e) => setMail(e.target.value)}
                                            value={mail}
                                            required
                                            aria-invalid={validMail ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setMailFocus(true)}
                                            onBlur={() => setMailFocus(false)}
                                        />
                                    </div>
                                    <label htmlFor="mail" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} className={validMail ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validMail || !mail ? "hide" : "invalid"} />
                                    </label>

                                </div>
                            </div>
                            <p id="uidnote" className={mailFocus && mail && !validMail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Ingrese un correo electrónico válido.<br />
                            </p>
                            <br />
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <input
                                            className="form-control"
                                            placeholder="Nombre de usuario"
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            required
                                            aria-invalid={validUsername ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                    </div>
                                    <label htmlFor="username" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                                    </label>
                                </div>
                            </div>
                            <p id="uidnote" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 a 24 caracteres.<br />
                                Debe empezar con una letra.<br />
                                Letras, números, guión bajo y guiones permitidos.
                            </p>
                            <br />
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <input
                                            className="form-control"
                                            placeholder="Contraseña"
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            aria-invalid={validPassword ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                    </div>
                                    <label htmlFor="password" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} id="pass" className={validPassword ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} id="pass" className={validPassword || !password ? "hide" : "invalid"} />
                                    </label>
                                </div>
                            </div>
                            <p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 a 24 caracteres.<br />
                                Debe incluir mayúscula, minúscula, un número y un caracter especial.<br />
                                Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>



                            <br />
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <input
                                            className="form-control"
                                            placeholder="Confirmar contraseña"
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                    </div>
                                    <label htmlFor="confirm_pwd" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                    </label> */}
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