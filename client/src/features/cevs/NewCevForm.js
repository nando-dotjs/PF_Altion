import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewCevMutation } from "./cevsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import  useAuth  from '../../hooks/useAuth'


const ID_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{5,20}$/;
const CEL_REGEX = /^\d{9}$/;
const DETAILS_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{10,50}$/;
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;


const NewCevForm = ({ users }) => {

    const {username, isAdmin, isCEV, isEmpresa} = useAuth()

    const [addNewCev, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCevMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [idFamily, setIdFamily] = useState('')
    const [validId, setValidID] = useState(false)
    const [IdFocus, setIDFocus] = useState(false);

    const [cel, setCel] = useState('')
    const [validCel, setValidCel] = useState(false)
    const [celFocus, setCelFocus] = useState(false);

    const [details, setDetails] = useState('')
    const [validDetails, setValidDetails] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

    const [street, setStreet] = useState('')
    const [validStreet, setValidStreet] = useState(false)
    const [streetFocus, setStreetFocus] = useState(false);

    const [streetNumber, setStreetNumber] = useState('')
    const [validStreetNumber, setValidStreetNumber] = useState(false)
    const [streetNumberFocus, setStreetNumberFocus] = useState(false);

    const [userId, setUserId] = useState(users[0].id)

    
    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setValidID(ID_REGEX.test(idFamily));
    }, [idFamily])

    useEffect(() => {
        setValidCel(CEL_REGEX.test(cel));
    }, [cel])

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
        setErrMsg('');
    }, [idFamily, cel, details, street, streetNumber])

    useEffect(() => {
        if (isSuccess) {
            setIdFamily('')
            setCel('')
            setDetails('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            navigate('/dash/cevs')
        }
    }, [isSuccess, navigate])

    const onIdFamilyChanged = e => setIdFamily(e.target.value)
    const onCelChanged = e => setCel(e.target.value)
    const onDetailsChanged = e => setDetails(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)

    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [validId, validCel, validDetails, validStreet, validStreetNumber, userId].every(Boolean) && !isLoading
    const onSaveCevClicked = async (e) => {
        e.preventDefault()
        if (isAdmin && canSave) {
                await addNewCev({ user: userId, idFamily, cel, details, street, streetNumber, userId })
        } 
        if((isCEV || isEmpresa)) {
                let userIdLog = '';
                users.map(user => {
                    if (user.username == username) {
                        userIdLog = user.id
                    }
                    return userIdLog
                })
                await addNewCev({ user: userIdLog, idFamily, cel, details, street, streetNumber, userIdLog })
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

            <form className="form" onSubmit={onSaveCevClicked}>
                <div className="formTitleRow">
                    <h2>Nuevo CEV</h2>
                    <div className="formActionButtons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label htmlFor="id">
                    Nombre:
                    <FontAwesomeIcon icon={faCheck} className={validId ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validId || !idFamily ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput`}
                    id="id"
                    name="id"
                    type="text"
                    autoComplete="off"
                    value={idFamily}
                    onChange={onIdFamilyChanged}
                    required
                    aria-invalid={validId ? "false" : "true"}
                    aria-describedby="uidcev"
                    onFocus={() => setIDFocus(true)}
                    onBlur={() => setIDFocus(false)}
                />
                <p id="uidcev" className={IdFocus && idFamily && !validId? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    5 a 20 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
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
                    aria-describedby="uidcev"
                    onFocus={() => setCelFocus(true)}
                    onBlur={() => setCelFocus(false)}
                />
                <p id="uidcev" className={celFocus && cel && !validCel? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    0 a 9 números.<br />
                    No puedo contener otro tipo de carácteres.<br />
                </p>

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
                    {labelSelector}
                    {selectorAdmin}
                    {input}
            </form>
        </>
    )

    return content
}

export default NewCevForm