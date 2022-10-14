import { useRef, useState, useEffect } from "react"
import { useUpdateCompanyMutation, useDeleteCompanyMutation } from "./companysApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

const FANTASY_NAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{5,20}$/;
const SOCIAL_REASON_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,10}$/;
const RUT_REGEX = /^\d{12}$/;
const CEL_REGEX = /^\d{9}$/;
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;


const EditCompanyForm = ({ company, users }) => {

    const {username, isAdmin, isCEV, isEmpresa} = useAuth()

    const [updateCompany, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCompanyMutation()

    const [deleteCompany, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCompanyMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [fantasyName, setFantasyName] = useState(company.fantasyName)
    const [validFantasyName, setValidFantasyName] = useState(false)
    const [FantasyNameFocus, setFantasyNameFocus] = useState(false);

    const [socialReason, setSocialReason] = useState(company.socialReason)
    const [validSocialReason, setValidSocialReason] = useState(false)
    const [SocialReasonFocus, setSocialReasonFocus] = useState(false);

    const [rut, setrut] = useState(company.rut)
    const [validCompanyRUT, setValidCompanyRUT] = useState(false)
    const [rutFocus, setrutFocus] = useState(false);

    const [cel, setCel] = useState(company.cel)
    const [validCel, setValidCel] = useState(false)
    const [celFocus, setCelFocus] = useState(false);

    const [street, setStreet] = useState(company.street)
    const [validStreet, setValidStreet] = useState(false)
    const [streetFocus, setStreetFocus] = useState(false);

    const [streetNumber, setStreetNumber] = useState(company.streetNumber)
    const [validStreetNumber, setValidStreetNumber] = useState(false)
    const [streetNumberFocus, setStreetNumberFocus] = useState(false);

    const [completed, setCompleted] = useState(company.completed)
    const [userId, setUserId] = useState(company.user)

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
        setErrMsg('');
    }, [fantasyName, socialReason, rut, cel, street, streetNumber])
    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setFantasyName('')
            setSocialReason('')
            setrut('')
            setCel('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            navigate('/dash/companys')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onFantasyNameChanged = e => setFantasyName(e.target.value)
    const onSocialReasonChanged = e => setSocialReason(e.target.value)
    const onCompanyRUTChanged = e => setrut(e.target.value)
    const onCelChanged = e => setCel(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)

    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [validFantasyName, validSocialReason, validCompanyRUT,validCel, validStreet, validStreetNumber, userId].every(Boolean) && !isLoading

    const onSaveCompanyClicked = async (e) => {
        if (canSave) {
            await updateCompany({ id: company.id, user: userId, fantasyName, socialReason, rut, cel, street, streetNumber, completed })
        }
    }

    const onDeleteCompanyClicked = async () => {
        await deleteCompany({ id: company.id })
    }

    const created = new Date(company.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(company.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    let selector = null 
    let input = null
    let label = null
    let check = null
    if (isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteCompanyClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
        selector = (
            <select
                            id="cev-username"
                            name="username"
                            className="formSelect"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
        )
        label = (
                <label>Registro completado:</label>
                )
        check = (
                        
                            <input
                                className="formCheckbox"
                                id="cev-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
        )
    } else if (isCEV || isEmpresa) {
        input = <input readOnly
                className={`formInput`}
                id="idUser"
                name="idUser"
                type="text"
                autoComplete="off"
                value={username}
            />
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="formTitleRow">
                    <h2>Editar CEV</h2>
                    <div className="formActionButtons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveCompanyClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
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
                <p id="uidcev" className={FantasyNameFocus && fantasyName && !validFantasyName? "instructions" : "offscreen"}>
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
                <p id="uidcev" className={SocialReasonFocus && socialReason && !validSocialReason? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    5 a 20 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
                </p>

                <label htmlFor="socialReason">
                    RUT:
                    <FontAwesomeIcon icon={faCheck} className={validCompanyRUT ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validCompanyRUT || !socialReason ? "hide" : "invalid"} />
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
                <p id="uidcev" className={rutFocus && rut && !validCompanyRUT? "instructions" : "offscreen"}>
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
                    className={`formInput `}
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

                <div className="formRow">
                    <div className="formDivider">
                        <label className="formLabel formCheckboxContainer" htmlFor="cev-completed">
                            {label}
                            {check}
                        </label>

                        <label className="formLabel formCheckboxContainer" htmlFor="cev-username">
                            Propietario:</label>
                            {selector}
                            {input}
                        
                    </div>
                    <div className="formDivider">
                        <p className="formCreated">Creado:<br />{created}</p>
                        <p className="formUpdated">Actualizado:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditCompanyForm