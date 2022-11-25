import { useRef, useState, useEffect } from "react"
import { useUpdatePointMutation } from "./pointsApiSlice"
import { useGetZonesQuery } from "../zones/zonesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import MapContainer from '../maps/MapContainer'
import useAuth from '../../hooks/useAuth'
import Form from 'react-bootstrap/Form';
import '../users/register.css'

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Swal from "sweetalert2"

// eslint-disable-next-line
const PHONENUMBER_REGEX = /^\d{8,9}$/;
// eslint-disable-next-line
const NAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{7,20}$/;
// eslint-disable-next-line
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;


const EditPointForm = ({ point, users }) => {

    const { username, isAdmin, isCEV, isEmpresa } = useAuth()

    const [updatePoint, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdatePointMutation()

    // const [deleteCev, {
    //     isSuccess: isDelSuccess,
    //     isError: isDelError,
    //     error: delerror
    // }] = useDeleteCevMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');

    const [phoneNumber, setPhoneNumber] = useState(point.phoneNumber)
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [name, setName] = useState(point.name)
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);

    const [street, setStreet] = useState(point.street)
    const [validStreet, setValidStreet] = useState(false)
    const [streetFocus, setStreetFocus] = useState(false);

    const [streetNumber, setStreetNumber] = useState(point.streetNumber)
    const [validStreetNumber, setValidStreetNumber] = useState(false)
    const [streetNumberFocus, setStreetNumberFocus] = useState(false);

    const [completed, setCompleted] = useState(point.completed)
    const [userId, setUserId] = useState(point.user)


    const [lat, setLat] = useState(+point.lat)
    const [validLatitude, setValidLatitude] = useState(false)
    const [latitudeNumberFocus, setLatitudeNumberFocus] = useState(false);

    const [lng, setLng] = useState(+point.long)
    const [validLongitude, setValidLongitude] = useState(false)
    const [longitudeNumberFocus, setLongitudeNumberFocus] = useState(false);


    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        document.title = 'Modificación de Punto';
    });

    const [values, setValues] = useState([])
    const [optionsZone, setOptions] = useState(point.zone)

    const {
        data: zones, isSuccess: zonesIsSuccess
    } = useGetZonesQuery('zonesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {

        let zonesList = []
        if (zonesIsSuccess) {
            for(var z in zones.ids){
                zonesList.push(zones.entities[zones.ids[z]]);
            }
        }
        setValues(zonesList)

    }, [zones]);

    const optionsToChoose = values?.map((options, i) => ( options.active && <option key={i}> {options.name}</option>))

    useEffect(() => {
        setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidStreet(STREET_REGEX.test(street));
    }, [street])

    useEffect(() => {
        setValidStreetNumber(STREET_NUMBER_REGEX.test(streetNumber));
    }, [streetNumber])

    useEffect(() => {
        setErrMsg('');
    }, [name, phoneNumber, street, streetNumber, lat, lng])

    useEffect(() => {

        // if (isSuccess || isDelSuccess) {
        //     setIdFamily('')
        //     setPhoneNumber('')
        //     setName('')
        //     setStreet('')
        //     setStreetNumber('')
        //     setUserId('')
        //     navigate('/dash/cevs')
        // }
        if (isSuccess) {
            setPhoneNumber('')
            setName('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            setOptions('')
            navigate('/dash/points')
        }
        //    [isSuccess, isDelSuccess, navigate]
    }, [isSuccess, navigate])

    const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)

    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const onZoneNameChanged = e => setOptions(e.target.value)

    const canSave = [validPhoneNumber, validName, validStreet, validStreetNumber, userId, optionsZone].every(Boolean) && !isLoading

    const onSavePointClicked = async (e) => {
        if (name == ""){
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar el nombre'
            })


        } else if (phoneNumber == "") {
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar el teléfono o celular'
            })
        } else if (street == "") {
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar calle'
            })
        } else if (streetNumber == "") {
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar número de puerta'
            })
        }else if (canSave) {
            await updatePoint({ id: point.id, user: userId, name, phoneNumber, street, streetNumber, completed, zone: optionsZone })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                        })
                    } else {
                        Toast.fire({
                            icon: 'info',
                            title: response.data.message
                          })
                    }
                })
        }
       
    }

    const created = new Date(point.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(point.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const latlng = { "lat": lat, "lng": lng }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.name+' '+user.surname}</option >
        )
    })

    // const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    // const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const errContent = (error?.data?.message) ?? ''

    // let deleteButton = null
    let selector = null
    let selectorZone = null
    let input = null
    let label = null
    let check = null
    let map = null
    map = (
        <MapContainer isDraggable={false} latlng={latlng} />
    )
    if (isAdmin) {
        
        selector = (



            <Form.Select
                id="point-username"
                name="username"
                className="formSelect"
                value={userId}
                onChange={onUserIdChanged}
            >
                {options}
            </Form.Select>
        )

        selectorZone = (
            // onChange={(e)=>setOptions(e.target.value)}
            <Form.Select
                id="point-zone"
                name="point-zone"
                className="formSelect"
                value={optionsZone}
                onChange={onZoneNameChanged}
            >
                <option selected disabled hidden > -- Elige zona -- </option>
                {
                    optionsToChoose
                }
            </Form.Select>
        )
        label = (
            <label>Validar Punto:</label>
        )
        check = (

            <Form.Check
                className="formCheckbox"
                id="point-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
            />
        )
    } 
    // else if (isCEV || isEmpresa) {
    //     input = <Form.Check readOnly
    //         className={`formInput`}
    //         id="idUser"
    //         name="idUser"
    //         type="text"
    //         autoComplete="off"
    //         value={username}
    //     />
    // }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate('/dash/points');
    };
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


    const content = (
        <>
            <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="cabezal"><strong>Editar Punto</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   

                    <Form className="form" onSubmit={e => e.preventDefault()}>
                        <div className="formTitleRow">
                            {/* <h1 id="cabezal">Editar Punto</h1> */}
                            <div className="formActionButtons">
                                {/* <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveCevClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button> */}
                                {/* {deleteButton} */}
                            </div>
                        </div>
                        <br />
                        <div className="formDivider">
                            <p className="formCreated">Creado: {created}</p>
                            <p className="formUpdated">Actualizado: {updated}</p>
                        </div>
                        <br />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <input
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={onNameChanged}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidpoint"
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
                        <p id="uidpoint" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            10 a 50 caracteres.<br />
                            Debe empezar y contener solo letras.<br />
                        </p>
                        <br />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">

                                    <input
                                        className="form-control"
                                        placeholder="Teléfono"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={onPhoneNumberChanged}
                                        required
                                        aria-invalid={validPhoneNumber ? "false" : "true"}
                                        aria-describedby="uidpoint"
                                        onFocus={() => setPhoneNumberFocus(true)}
                                        onBlur={() => setPhoneNumberFocus(false)}
                                    />
                                </div>
                                <label htmlFor="phoneNumber" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>
                        <p id="uidpoint" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            0 a 9 números.<br />
                            No puedo contener otro tipo de carácteres.<br />
                        </p>
                        <br />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <input
                                        className="form-control"
                                        id="street"
                                        placeholder="Calle"
                                        name="street"
                                        value={street}
                                        onChange={onStreetChanged}
                                        required
                                        aria-invalid={validStreet ? "false" : "true"}
                                        aria-describedby="uidpoint"
                                        onFocus={() => setStreetFocus(true)}
                                        onBlur={() => setStreetFocus(false)}
                                    />
                                </div>
                                <label htmlFor="street" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validStreet ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validStreet || !street ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>
                        <p id="uidpoint" className={streetFocus && street && !validStreet ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 a 20 caracteres.<br />
                            Debe empezar y contener solo letras.<br />
                        </p>
                        <br />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <input
                                        className="form-control"
                                        placeholder="Número"
                                        id="text"
                                        name="text"
                                        value={streetNumber}
                                        onChange={onStreetNumberChanged}
                                        required
                                        aria-invalid={validStreetNumber ? "false" : "true"}
                                        aria-describedby="uidpoint"
                                        onFocus={() => setStreetNumberFocus(true)}
                                        onBlur={() => setStreetNumberFocus(false)}
                                    />
                                </div>
                                <label htmlFor="number" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validStreetNumber ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validStreetNumber || !streetNumber ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>
                        <p id="uidpoint" className={streetNumberFocus && streetNumber && !validStreetNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Solo números.<br />
                            No puedo contener otro tipo de carácteres.<br />
                        </p>
                        <br />
                        <div className="formRow">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                    {(isAdmin) &&<label className="formLabel formCheckboxContainer" htmlFor="point-username">
                                            Asigando a:</label>}
                                        <br />
                                        {selector}
                                        {input}
                                    </div>
                                    <br />
                                    <div className="col">
                                    {(isAdmin) && <label className="formLabel formCheckboxContainer" htmlFor="point-username">
                                            Zona:</label>}
                                        {selectorZone}
                                    </div>
                                </div>


                                <label className="formLabel formCheckboxContainer" htmlFor="point-completed">
                                    <br />
                                    {label}
                                    {check}
                                </label>
                                <br />

                            </div>

                        </div>
                        <br />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <label>Ubicación</label>
                                    {map}
                                </div>    
                            </div>
                        </div>
                        
                        <br />


                        <br></br>
                        {/* <Button className="formSubmitButton" onClick={onSavePointClicked} disabled={!validPhoneNumber || !validName || !validStreet || !validStreetNumber || !optionsZone ? true : false}>Guardar cambios</Button> */}
                        <br></br>
                        <br></br>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSavePointClicked} 
                    // disabled={!validPhoneNumber || !validName || !validStreet || !validStreetNumber || !optionsZone ? true : false}
                    >Guardar cambios</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return content
}

export default EditPointForm
