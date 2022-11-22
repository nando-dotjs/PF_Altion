import { useRef, useState, useEffect } from "react"
import { useUpdatePointMutation,selectPointById } from "./pointsApiSlice"
import { selectUserById } from "../users/usersApiSlice"
import { useNavigate,useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import MapContainer from '../maps/MapContainer'
import useAuth from '../../hooks/useAuth'
import Form from 'react-bootstrap/Form';
import '../users/register.css'
import { useSelector } from 'react-redux'

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


const ViewPointForm = () => {
    let { id } = useParams();
    const point = useSelector(state => selectPointById(state, id))
    const user = useSelector(state => selectUserById(state, point.user))

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

    console.log(point)
    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        document.title = 'Ver Punto';
    });

    const [values, setValues] = useState([])
    const [optionsZone, setOptions] = useState(point.zone)
    useEffect(() => {
        fetch("https://unidosporlaclasificacion-api.onrender.com/zones")
            .then((data) => data.json()).then((val) => { setValues(val) })
    }, []);

    const optionsToChoose = values?.map((options, i) => (<option key={i}>{options.active ? options.name : 'No asignar'}</option>))

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



    const created = new Date(point.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(point.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const latlng = { "lat": lat, "lng": lng }

    

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
    console.log(userId)
    map = (
        <MapContainer isDraggable={false} latlng={latlng} />
    )
 
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
                    <Modal.Title id="cabezal"><strong>Ver Punto</strong></Modal.Title>
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
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <strong>Nombre</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={onNameChanged}
                                        required
                                        aria-describedby="uidpoint"
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Teléfono</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Teléfono"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={onPhoneNumberChanged}
                                        required
                                        aria-describedby="uidpoint"
                                        onFocus={() => setPhoneNumberFocus(true)}
                                        onBlur={() => setPhoneNumberFocus(false)}
                                    />
                                </div>

                            </div>
                        </div>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Calle</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        id="street"
                                        placeholder="Calle"
                                        name="street"
                                        value={street}
                                        onChange={onStreetChanged}
                                        required
                                        aria-describedby="uidpoint"
                                        onFocus={() => setStreetFocus(true)}
                                        onBlur={() => setStreetFocus(false)}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Número</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Número"
                                        id="text"
                                        name="text"
                                        value={streetNumber}
                                        onChange={onStreetNumberChanged}
                                        required
                                        aria-describedby="uidpoint"
                                        onFocus={() => setStreetNumberFocus(true)}
                                        onBlur={() => setStreetNumberFocus(false)}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Asignado a</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Sin Asignar"
                                        id="point-username"
                                        name="text"
                                        value={user.name +' '+user.surname}
                                        required
                                        aria-describedby="uidpoint"
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Zona</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Sin Asignar"
                                        id="point-zone"
                                        name="text"
                                        value={point.zone}
                                        required
                                        aria-describedby="uidpoint"
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Ubicación</strong>
                                    {map}
                                </div>
                            </div>
                        </div>
                        
                        <br />
                        
                        <br />
                        {/* <Button className="formSubmitButton" onClick={onSavePointClicked} disabled={!validPhoneNumber || !validName || !validStreet || !validStreetNumber || !optionsZone ? true : false}>Guardar cambios</Button> */}
                        <br></br>
               
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return content
}

export default ViewPointForm
