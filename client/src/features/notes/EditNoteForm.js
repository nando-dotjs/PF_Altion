import { useRef, useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

const ID_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{5,20}$/;
const CEL_REGEX = /^\d{9}$/;
const DETAILS_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{10,50}$/;
const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
const STREET_NUMBER_REGEX = /^[0-9]+$/;


const EditNoteForm = ({ note, users }) => {

    const { isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [idFamily, setIdFamily] = useState(note.idFamily)
    const [validId, setValidID] = useState(false)
    const [IdFocus, setIDFocus] = useState(false);

    const [cel, setCel] = useState(note.cel)
    const [validCel, setValidCel] = useState(false)
    const [celFocus, setCelFocus] = useState(false);

    const [details, setDetails] = useState(note.details)
    const [validDetails, setValidDetails] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

    const [street, setStreet] = useState(note.street)
    const [validStreet, setValidStreet] = useState(false)
    const [streetFocus, setStreetFocus] = useState(false);

    const [streetNumber, setStreetNumber] = useState(note.streetNumber)
    const [validStreetNumber, setValidStreetNumber] = useState(false)
    const [streetNumberFocus, setStreetNumberFocus] = useState(false);

    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

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

        if (isSuccess || isDelSuccess) {
            setIdFamily('')
            setCel('')
            setDetails('')
            setStreet('')
            setStreetNumber('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onIdFamilyChanged = e => setIdFamily(e.target.value)
    const onCelChanged = e => setCel(e.target.value)
    const onDetailsChanged = e => setDetails(e.target.value)
    const onStreetChanged = e => setStreet(e.target.value)
    const onStreetNumberChanged = e => setStreetNumber(e.target.value)

    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [validId, validCel, validDetails, validStreet, validStreetNumber, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, idFamily, cel, details, street, streetNumber, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

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
    if (isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
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
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label htmlFor="id">
                    Identificacion de Familia:
                    <FontAwesomeIcon icon={faCheck} className={validId ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validId || !idFamily ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput `}
                    id="id"
                    name="id"
                    type="text"
                    autoComplete="off"
                    value={idFamily}
                    onChange={onIdFamilyChanged}
                    required
                    aria-invalid={validId ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setIDFocus(true)}
                    onBlur={() => setIDFocus(false)}
                />
                <p id="uidnote" className={IdFocus && idFamily && !validId? "instructions" : "offscreen"}>
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
                    className={`formInput `}
                    id="cel"
                    name="cel"
                    value={cel}
                    onChange={onCelChanged}
                    required
                    aria-invalid={validCel ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setCelFocus(true)}
                    onBlur={() => setCelFocus(false)}
                />
                <p id="uidnote" className={celFocus && cel && !validCel? "instructions" : "offscreen"}>
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
                    className={`formInput `}
                    id="details"
                    name="details"
                    value={details}
                    onChange={onDetailsChanged}
                    required
                    aria-invalid={validDetails ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setDetailsFocus(true)}
                    onBlur={() => setDetailsFocus(false)}
                />
                <p id="uidnote" className={detailsFocus && details && !validDetails? "instructions" : "offscreen"}>
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
                    aria-describedby="uidnote"
                    onFocus={() => setStreetFocus(true)}
                    onBlur={() => setStreetFocus(false)}
                />
                <p id="uidnote" className={streetFocus && street && !validStreet? "instructions" : "offscreen"}>
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
                    aria-describedby="uidnote"
                    onFocus={() => setStreetNumberFocus(true)}
                    onBlur={() => setStreetNumberFocus(false)}
                />
                <p id="uidnote" className={streetNumberFocus && streetNumber && !validStreetNumber? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Solo números.<br />
                    No puedo contener otro tipo de carácteres.<br />
                </p>

                <div className="formRow">
                    <div className="formDivider">
                        <label className="formLabel formCheckboxContainer" htmlFor="note-completed">
                            Registro completado:
                            <input
                                className="formCheckbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="formLabel formCheckboxContainer" htmlFor="note-username">
                            Propietario:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="formSelect"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
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

export default EditNoteForm