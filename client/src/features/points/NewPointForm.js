import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewPointMutation } from "./pointsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import  useAuth  from '../../hooks/useAuth'
import MapPopup from '../maps/MapPopup'

const PHONENUMBER_REGEX = /^\d{9}$/;
// eslint-disable-next-line
const DETAILS_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{10,50}$/;
// eslint-disable-next-line
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;

const LATITUDE_REGEX = /(.|\s)*\S(.|\s)*/
const LONGITUDE_REGEX = /(.|\s)*\S(.|\s)*/

const NewPointForm = ({ users }) => {

    const {username, isAdmin, isCEV, isEmpresa} = useAuth()

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

    const [details, setDetails] = useState('')
    const [validDetails, setValidDetails] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

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
        setValidDetails(DETAILS_REGEX.test(details));
    }, [details])

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
    }, [phoneNumber, details, street, streetNumber, lat, lng])

    useEffect(() => {
        if (isSuccess) {
            setPhoneNumber('')
            setDetails('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            setValidLatitude('')
            setValidLongitude('')
            navigate('/dash/points')
        }
    }, [isSuccess, navigate])

    const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
    const onDetailsChanged = e => setDetails(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)
    
    const onLatChanged = e => setLat(e.target.value)
    const onLngChanged = e => setLng(e.target.value)

    const onUserIdChanged = e => setUserId(e.target.value)

    let latlng = lat && lng ? {"lat":lat, "lng":lng} : null


    const canSave = [validPhoneNumber, validDetails, validStreet, validStreetNumber, validLatitude, validLongitude, userId].every(Boolean) && !isLoading

    const onSavePointClicked = async (e) => {
        e.preventDefault()
        if (isAdmin && canSave) {
                await addNewPoint({ user: userId, details, phoneNumber, street, streetNumber, lat, long: lng, userId })
                console.log(canSave);
        } 
        if((isCEV || isEmpresa)) {
                let userIdLog = '';
                users.map(user => {
                    if (user.username === username) {
                        userIdLog = user.id
                    }
                    return userIdLog
                })
                await addNewPoint({ user: userIdLog, details, phoneNumber, street, streetNumber, lat, long: lng, userIdLog })
        }
        <label className="formLabel formCheckboxContainer" htmlFor="cev-username">
                            Propietario:</label>
    }


    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    let labelSelector = null
    let selectorAdmin = null
    let input = null
    if (isAdmin) {
        labelSelector = (<label>Propietario</label>)
        selectorAdmin = (<select
                id="username"
                name="username"
                className="formSelect"
                value={userId}
                onChange={onUserIdChanged}
                >
                {options}
                </select>)
    } else if (isCEV || isEmpresa) {
        labelSelector = (<label>Propietario</label>)
        input = <input readOnly
                className={`formInput`}
                id="idUser"
                name="idUser"
                type="text"
                autoComplete="off"
                value={username}
            />
    }

    const errClass = isError ? "errmsg" : "offscreen"
    
    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSavePointClicked}>
                <div className="formTitleRow">
                    <h2>Nuevo Punto</h2>
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

                <label htmlFor="details">
                    Detalles:
                    <FontAwesomeIcon icon={faCheck} className={validDetails ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validDetails || !details ? "hide" : "invalid"} />
                </label>
                <textarea
                    className={`formInput`}
                    id="details"
                    name="details"
                    value={details}
                    onChange={onDetailsChanged}
                    required
                    aria-invalid={validDetails ? "false" : "true"}
                    aria-describedby="uidcev"
                    onFocus={() => setDetailsFocus(true)}
                    onBlur={() => setDetailsFocus(false)}
                />
                <p id="uidcev" className={detailsFocus && details && !validDetails? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    10 a 50 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
                </p>

                <label htmlFor="phoneNumber">
                    Teléfono/Celular:
                    <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
                </label>
                <textarea
                    className={`formInput`}
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
                <p id="uidcev" className={phoneNumberFocus && phoneNumber && !validPhoneNumber? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    0 a 9 números.<br />
                    No puedo contener otro tipo de carácteres.<br />
                </p>

                <label htmlFor="street">
                    Calle:
                    <FontAwesomeIcon icon={faCheck} className={validStreet ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validStreet || !street ? "hide" : "invalid"} />
                </label>
                <textarea
                    className={`formInput`}
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
                <p id="uidcev" className={streetFocus && street && !validStreet? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 a 20 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
                </p>

                <label htmlFor="number">
                    Número:
                    <FontAwesomeIcon icon={faCheck} className={validStreetNumber ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validStreetNumber || !streetNumber ? "hide" : "invalid"} />
                </label>
                <textarea
                    className={`formInput`}
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
                <p id="uidcev" className={streetNumberFocus && streetNumber && !validStreetNumber? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Solo números.<br />
                    No puedo contener otro tipo de carácteres.<br />
                </p>
        
                {/* <label htmlFor="latitud">
                  
                    <FontAwesomeIcon icon={faCheck} className={validLatitude ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLatitude || !lat ? "hide" : "invalid"} />
                </label> */}
                <textarea 
                    className={`formInput`}
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
                <p id="uidlat" className={latitudeNumberFocus && lat && !validLatitude? "instructions" : "offscreen"}>
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
                    aria-invalid={validLongitude? "false" : "true"}
                    aria-describedby="uidlng"
                    onFocus={() => setLongitudeNumberFocus(true)}
                    onBlur={() => setLongitudeNumberFocus(false)}
                />
                <p id="uidlng" className={longitudeNumberFocus && lng && !validLongitude? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    No es una geo correcta<br />
                </p>
                <label>
                    Ubicación:
                </label>
                <button
                    className="formSubmitButton"
                    onClick={(e) => {
                        e.preventDefault()
                        setMapPopup(true)}}>
                    Seleccionar dirección
                </button>
                <MapPopup trigger={mapPopup} setTrigger={setMapPopup} lat={setLat} lng={setLng} latlng={latlng}/>

                    {labelSelector}
                    {selectorAdmin}
                    {input}
                    <br></br>
                    <button className="formSubmitButton" disabled={!validPhoneNumber||  !validDetails||  !validStreet||  !validStreetNumber ||  !validLatitude || !validLongitude ? true : false}>Registrar</button>


            </form>
        </>
    )

    return content
}

export default NewPointForm