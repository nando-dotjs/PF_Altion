import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewPointMutation } from "./pointsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'
import MapPopup from '../maps/MapPopup'
import '../users/register.css'
import Swal from "sweetalert2"
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const PHONENUMBER_REGEX = /^\d{8,9}$/;
// eslint-disable-next-line
const NAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{7,20}$/;
// eslint-disable-next-line
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;

const LATITUDE_REGEX = /(.|\s)*\S(.|\s)*/
const LONGITUDE_REGEX = /(.|\s)*\S(.|\s)*/

const NewPointForm = ({ users }) => {

    const { mail, isAdmin, isCEV, isEmpresa } = useAuth()

    const [addNewPoint, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPointMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('')
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [street, setStreet] = useState('')
    const [validStreet, setValidStreet] = useState(false)
    const [streetFocus, setStreetFocus] = useState(false);

    const [streetNumber, setStreetNumber] = useState('')
    const [validStreetNumber, setValidStreetNumber] = useState(false)
    const [streetNumberFocus, setStreetNumberFocus] = useState(false);

    const [userId, setUserId] = useState(users[0].id)

    const [mapPopup, setMapPopup] = useState(false)
    const [handleShow, setHandleShow] = useState(false)

    const [lat, setLat] = useState('')
    const [validLatitude, setValidLatitude] = useState(false)
    const [latitudeNumberFocus, setLatitudeNumberFocus] = useState(false);


    const [lng, setLng] = useState('')
    const [validLongitude, setValidLongitude] = useState(false)
    const [longitudeNumberFocus, setLongitudeNumberFocus] = useState(false);


    useEffect(() => {
        userRef?.current?.focus();
    }, [])

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
        setValidLatitude(LATITUDE_REGEX.test(lat));
    }, [lat])

    useEffect(() => {
        setValidLongitude(LONGITUDE_REGEX.test(lng));
    }, [lng])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber, name, street, streetNumber, lat, lng])

    useEffect(() => {
        if (isSuccess) {
            setPhoneNumber('')
            setName('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            setValidLatitude('')
            setValidLongitude('')
            navigate('/dash/points')
        }
    }, [isSuccess, navigate])

    const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)

    const onLatChanged = e => setLat(e.target.value)
    const onLngChanged = e => setLng(e.target.value)

    const onUserIdChanged = e => setUserId(e.target.value)

    let latlng = lat && lng ? { "lat": lat, "lng": lng } : null


    const canSave = [validPhoneNumber, validName, validStreet, validStreetNumber, validLatitude, validLongitude, userId].every(Boolean) && !isLoading

    const onSavePointClicked = async (e) => {
        e.preventDefault()

        if((isAdmin || isCEV || isEmpresa) && canSave) {
            let userIdLog = '';
            users.map(user => {
                if (user.mail === mail) {
                    userIdLog = user.id
                }
                return userIdLog
            })
            await addNewPoint({ user: userIdLog, name, phoneNumber, street, streetNumber, lat, long: lng, userId })
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
        
        <label className="formLabel formCheckboxContainer" htmlFor="cev-mail">
            Propietario:</label>
    }

    let labelSelector = null
    let input = null
    if (isAdmin || isCEV || isEmpresa) {
        labelSelector = (<label>Propietario</label>)
        input = <input readOnly
            className={`formInput`}
            id="idUser"
            name="idUser"
            type="text"
            autoComplete="off"
            value={mail}
        />
    }

  

    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(true)
    navigate('/dash');
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
          <Modal.Title id="cabezal"><strong>Nuevo Punto</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
            {/* <div className="account-wall" align="center"> */}
                <Container fluid>
                   

                    <form className="form" onSubmit={onSavePointClicked}>
                        <div className="formTitleRow">
                            {/* <h1 id="cabezal">Nuevo Punto</h1> */}
                            <div className="formActionButtons">
                                {/* <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button> */}
                            </div>
                        </div>
                        <br/>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <input
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={onNameChanged}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidcev"
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
                        <p id="uidcev" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            7 a 20 caracteres.<br />
                            Debe empezar y contener solo letras.<br />
                        </p>
                        <br/>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <input
                                        className="form-control"
                                        placeholder="Teléfono o celular"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={onPhoneNumberChanged}
                                        required
                                        aria-invalid={validPhoneNumber ? "false" : "true"}
                                        aria-describedby="uidcev"
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
                        <p id="uidcev" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Mínimo 8 caracteres, máximo 9.<br />
                            No puedo contener otro tipo de carácteres.<br />
                        </p>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                <br/>
                        <input
                            className="form-control"
                            placeholder="Calle"
                            id="street"
                            name="street"
                            value={street}
                            onChange={onStreetChanged}
                            required
                            aria-invalid={validStreet ? "false" : "true"}
                            aria-describedby="uidcev"
                            onFocus={() => setStreetFocus(true)}
                            onBlur={() => setStreetFocus(false)}
                        />
                        </div>
                        <label htmlFor="street" >
                            <FontAwesomeIcon icon={faCheck} className={validStreet ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validStreet || !street ? "hide" : "invalid"} />
                        </label>
                        </div>
                        </div>
                        <p id="uidcev" className={streetFocus && street && !validStreet ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 a 20 caracteres.<br />
                            Debe empezar y contener solo letras.<br />
                        </p>
                        <br/>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                        <input
                            className="form-control"
                            placeholder="Número de puerta"
                            id="text"
                            name="text"
                            value={streetNumber}
                            onChange={onStreetNumberChanged}
                            required
                            aria-invalid={validStreetNumber ? "false" : "true"}
                            aria-describedby="uidcev"
                            onFocus={() => setStreetNumberFocus(true)}
                            onBlur={() => setStreetNumberFocus(false)}
                        />
                        </div>
                          <label htmlFor="number">
                            <FontAwesomeIcon icon={faCheck} className={validStreetNumber ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validStreetNumber || !streetNumber ? "hide" : "invalid"} />
                        </label>
                        </div>
                        </div>
                        <p id="uidcev" className={streetNumberFocus && streetNumber && !validStreetNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Solo números.<br />
                            No puedo contener otro tipo de carácteres.<br />
                        </p>

                        {/* <label htmlFor="latitud">
                  
                    <FontAwesomeIcon icon={faCheck} className={validLatitude ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLatitude || !lat ? "hide" : "invalid"} />
                </label> */}
                        <input
                            className="form-control"
                            id="lat"
                            name="lat"
                            value={lat}
                            onChange={onLatChanged}
                            hidden
                            required
                            aria-invalid={validLatitude ? "false" : "true"}
                            aria-describedby="uidlat"
                            onFocus={() => setLatitudeNumberFocus(true)}
                            onBlur={() => setLatitudeNumberFocus(false)}
                        />
                        <p id="uidlat" className={latitudeNumberFocus && lat && !validLatitude ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            No es una geo correcta<br />
                        </p>
                        {/* <label htmlFor="longitud">
                    Longitud:
                    <FontAwesomeIcon icon={faCheck} className={validLongitude ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLongitude || !lng ? "hide" : "invalid"} />
                </label> */}
                        <textarea
                            className={`formInput`}
                            id="lng"
                            name="lng"
                            value={lng}
                            onChange={onLngChanged}
                            required
                            hidden
                            aria-invalid={validLongitude ? "false" : "true"}
                            aria-describedby="uidlng"
                            onFocus={() => setLongitudeNumberFocus(true)}
                            onBlur={() => setLongitudeNumberFocus(false)}
                        />
                        <p id="uidlng" className={longitudeNumberFocus && lng && !validLongitude ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            No es una geo correcta<br />
                        </p>
                        <br/>
                        {/* <label>
                            Ubicación:
                        </label> */}
                        
                        <Button
                            className="formSubmitButton"
                            onClick={(e) => {
                                e.preventDefault()
                                setMapPopup(true)
                                setHandleShow(true)
                            }}>
                            Seleccionar dirección
                        </Button>
                        <br/>
                        <MapPopup trigger={mapPopup} setTrigger={setMapPopup} lat={setLat} lng={setLng} latlng={latlng} />
                        <br/>
                        <br/>
                        
                        <br/>
                        
                        <br/>
                        
                        {/* <Button className="formSubmitButton" onClick={onSavePointClicked} disabled={!validPhoneNumber || !validName || !validStreet || !validStreetNumber || !validLatitude || !validLongitude ? true : false}>Registrar</Button> */}

                        <br/>
                        <br/>
                    </form>
                </Container>
            {/* </div> */}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={onSavePointClicked} disabled={!validPhoneNumber || !validName || !validStreet || !validStreetNumber || !validLatitude || !validLongitude ? true : false}>
           Registrar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )

    return content
}

export default NewPointForm