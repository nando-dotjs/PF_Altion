import { useRef, useState, useEffect } from "react"
import { useUpdateZoneMutation} from "./zonesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;

const EditZoneForm = ({ zone }) => {

    const [updateZone, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateZoneMutation()

    // const [deleteZone, {
    //     isSuccess: isDelSuccess,
    //     isError: isDelError,
    //     error: delerror
    // }] = useDeleteZoneMutation()

    const navigate = useNavigate()
    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name, setName] = useState(zone.name)
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [details, setDetails] = useState(zone.details)
    const [validDetails, setValidSurname] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

    const [active, setActive] = useState(zone.active)

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_SURNAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(NAME_SURNAME_REGEX.test(details));
    }, [details])

    useEffect(() => {
        setErrMsg('');
    }, [name, details])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDetails('')
            navigate('/dash/zones')
        }

    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDetailsChanged = e => setDetails(e.target.value)
    
    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveZoneClicked = async (e) => {
        await updateZone({ id: zone.id, name, details, active })
    }

    // const onDeleteZoneClicked = async () => {
    //     await deleteZone({ id: zone.id })
    // }

    let canSave = [validName, validDetails].every(Boolean) && !isLoading

    const errClass = (isError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <main className='editZone'>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="formTitleRow">
                        <h2>Editar Zona</h2>
                        <div className="formActionButtons">
                            {/* <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveZoneClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button> */}
                            {/* <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteZoneClicked}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button> */}
                        </div>
                    </div>
                    <label htmlFor="name">
                        Nombre: 
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                    </label>
                    <input
                    
                        className={`formInput`}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        value={name}
                        onChange={onNameChanged}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                    <p id="uidnote" className={nameFocus && name && !validName? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    2 a 15 caracteres.<br />
                    Debe empezar y contener solo letras.<br />
                    </p>

                    <label className="formLabel" htmlFor="details">
                        Detalles: 
                        <FontAwesomeIcon icon={faCheck} className={validDetails ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validDetails || !details ? "hide" : "invalid"} />
                    </label>
                    <input
                        className={`formInput`}
                        id="details"
                        name="details"
                        type="text"
                        autoComplete="off"
                        value={details}
                        onChange={onDetailsChanged}
                        
                        aria-invalid={validDetails ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setDetailsFocus(true)}
                        onBlur={() => setDetailsFocus(false)}
                    />
                    <p id="uidnote" className={detailsFocus && details && !validDetails? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        2 a 15 caracteres.<br />
                        Debe empezar y contener solo letras.<br />
                    </p>
                    <label className="formLabel formCheckboxContainer" htmlFor="zone-active">
                        ACTIVO:
                        <input
                            className="formCheckbox"
                            id="zone-active"
                            name="zone-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>
                    
                    <button className="formSubmitButton" onClick={onSaveZoneClicked} disabled={!validName ? true : false}>Guardar cambios</button>

                </form>
            </main>
        </>
    )

    return content
}
export default EditZoneForm