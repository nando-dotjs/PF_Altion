import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewCompanyMutation } from "./companysApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import  useAuth  from '../../hooks/useAuth'
import MapPopup from '../maps/MapPopup'


// eslint-disable-next-line
const FANTASY_NAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{5,20}$/;

// eslint-disable-next-line
const SOCIAL_REASON_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,10}$/;

const RUT_REGEX = /^\d{12}$/;
const CEL_REGEX = /^\d{9}$/;
// eslint-disable-next-line
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;

const LATITUDE_REGEX = /(.|\s)*\S(.|\s)*/
const LONGITUDE_REGEX = /(.|\s)*\S(.|\s)*/


const NewCompanyForm = ({ users }) => {

    const {username, isAdmin, isCEV, isEmpresa} = useAuth()

    const [addNewCompany, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCompanyMutation()

    // eslint-disable-next-line
    const navigate = useNavigate()

    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');

    const [fantasyName, setFantasyName] = useState('')
    const [validFantasyName, setValidFantasyName] = useState(false)
    const [FantasyNameFocus, setFantasyNameFocus] = useState(false);

    const [socialReason, setSocialReason] = useState('')
    const [validSocialReason, setValidSocialReason] = useState(false)
    const [SocialReasonFocus, setSocialReasonFocus] = useState(false);

    const [rut, setrut] = useState('')
    const [validCompanyRUT, setValidCompanyRUT] = useState(false)
    const [rutFocus, setrutFocus] = useState(false);

    const [cel, setCel] = useState('')
    const [validCel, setValidCel] = useState(false)
    const [celFocus, setCelFocus] = useState(false);

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

    
    let latlng = lat && lng ? {"lat":lat, "lng":lng} : null

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setValidFantasyName(FANTASY_NAME_REGEX.test(fantasyName));
    }, [fantasyName])

    useEffect(() => {
        setValidSocialReason(SOCIAL_REASON_REGEX.test(socialReason));
    }, [socialReason])

    useEffect(() => {
        setValidCompanyRUT(RUT_REGEX.test(rut));
    }, [rut])

    useEffect(() => {
        setValidCel(CEL_REGEX.test(cel));
    }, [cel])
    
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
    }, [fantasyName, socialReason, rut, cel, street, streetNumber, lat, lng])

    useEffect(() => {
        if (isSuccess) {
            setFantasyName('')
            setSocialReason('')
            setrut('')
            setCel('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            setValidLatitude('')
            setValidLongitude('')
            navigate('/dash/companys')
        }
    }, [isSuccess, navigate])

    const onFantasyNameChanged = e => setFantasyName(e.target.value)
    const onSocialReasonChanged = e => setSocialReason(e.target.value)
    const onCompanyRUTChanged = e => setrut(e.target.value)
    const onCelChanged = e => setCel(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)

    const onLatChanged = e => setLat(e.target.value)
    const onLngChanged = e => setLng(e.target.value)
    
    const onUserIdChanged = e => setUserId(e.target.value)
    
    const canSave = [validFantasyName, validSocialReason, validCompanyRUT, validCel, validStreet, validStreetNumber, validLatitude, validLongitude, userId].every(Boolean) && !isLoading

    const onSaveCompanyClicked = async (e) => {

        e.preventDefault()
        if (isAdmin && canSave) {
                await addNewCompany({ user: userId, fantasyName, socialReason, rut, cel, street, streetNumber, lat, long: lng, userId })
                console.log(rut)

            } 
        if((isCEV || isEmpresa)) {
                let userIdLog = '';
                users.map(user => {
                    if (user.username === username) {
                        userIdLog = user.id
                    }
                    return userIdLog
                })
                await addNewCompany({ user: userIdLog, fantasyName, socialReason, rut, cel, street, streetNumber, lat, long: lng, userIdLog })
        }
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

            <form className="form" onSubmit={onSaveCompanyClicked}>
                <div className="formTitleRow">
                    <h2>Nueva Empresa</h2>
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
                <label htmlFor="fantasyName">
                    Nombre Fantasía:
                    <FontAwesomeIcon icon={faCheck} className={validFantasyName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validFantasyName || !fantasyName ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput`}
                    id="fantasyName"
                    name="fantasyName"
                    type="text"
                    autoComplete="off"
                    value={fantasyName}
                    onChange={onFantasyNameChanged}
                    required
                    aria-invalid={validFantasyName ? "false" : "true"}
                    aria-describedby="uidcompany"
                    onFocus={() => setFantasyNameFocus(true)}
                    onBlur={() => setFantasyNameFocus(false)}
                />
                <p id="uidcompany" className={FantasyNameFocus && fantasyName && !validFantasyName? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    5 a 20 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
                </p>

                <label htmlFor="socialReason">
                    Razón Social:
                    <FontAwesomeIcon icon={faCheck} className={validSocialReason ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validSocialReason || !socialReason ? "hide" : "invalid"} />
                </label>
                <input
                
                    className={`formInput`}
                    id="socialReason"
                    name="socialReason"
                    type="text"
                    autoComplete="off"
                    value={socialReason}
                    onChange={onSocialReasonChanged}
                    required
                    aria-invalid={validSocialReason ? "false" : "true"}
                    aria-describedby="uidcompany"
                    onFocus={() => setSocialReasonFocus(true)}
                    onBlur={() => setSocialReasonFocus(false)}
                />
                <p id="uidcompany" className={SocialReasonFocus && socialReason && !validSocialReason? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    1 a 15 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
                </p>

                <label htmlFor="rut">
                    RUT:
                    <FontAwesomeIcon icon={faCheck} className={validCompanyRUT ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validCompanyRUT || !rut ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput`}
                    id="rut"
                    name="rut"
                    type="text"
                    autoComplete="off"
                    value={rut}
                    onChange={onCompanyRUTChanged}
                    required
                    aria-invalid={validCompanyRUT ? "false" : "true"}
                    aria-describedby="uidcompany"
                    onFocus={() => setrutFocus(true)}
                    onBlur={() => setrutFocus(false)}
                />
                <p id="uidcompany" className={rutFocus && rut && !validCompanyRUT? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Hasta 12 caracteres.<br />
                    No se permiten letras y/o símbolos<br />
                </p>

                <label htmlFor="cel">
                    Teléfono/Celular:
                    <FontAwesomeIcon icon={faCheck} className={validCel ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validCel || !cel ? "hide" : "invalid"} />
                </label>
                <textarea
                    className={`formInput`}
                    id="cel"
                    name="cel"
                    value={cel}
                    onChange={onCelChanged}
                    required
                    aria-invalid={validCel ? "false" : "true"}
                    aria-describedby="uidcompany"
                    onFocus={() => setCelFocus(true)}
                    onBlur={() => setCelFocus(false)}
                />
                <p id="uidcompany" className={celFocus && cel && !validCel? "instructions" : "offscreen"}>
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
                    aria-describedby="uidcompany"
                    onFocus={() => setStreetFocus(true)}
                    onBlur={() => setStreetFocus(false)}
                />
                <p id="uidcompany" className={streetFocus && street && !validStreet? "instructions" : "offscreen"}>
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
                    aria-describedby="uidcompany"
                    onFocus={() => setStreetNumberFocus(true)}
                    onBlur={() => setStreetNumberFocus(false)}
                />
                <p id="uidcompany" className={streetNumberFocus && streetNumber && !validStreetNumber? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Solo números.<br />
                    No puedo contener otro tipo de carácteres.<br />
                </p>
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
                    <button className="formSubmitButton" disabled={!validFantasyName || !validSocialReason || !validCompanyRUT || !validCel || !validStreet || !validStreetNumber || !validLatitude || !validLongitude ? true : false}>Registrar</button>

            </form>
        </>
    )

    return content
}

export default NewCompanyForm