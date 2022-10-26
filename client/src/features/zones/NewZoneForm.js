import { useRef, useState, useEffect } from "react"
import { useAddNewZoneMutation } from "./zonesApiSlice"
import { useNavigate } from "react-router-dom"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;

const NewZoneForm = () => {

    const [addNewZone, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewZoneMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [details, setDetails] = useState('')
    const [validDetails, setValidSurname] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

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

    const canSave = [validName].every(Boolean) && !isLoading

    const onSaveZoneClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewZone({ name, details})
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveZoneClicked}>
                <div className="formTitleRow">
                    <h2>Registro de Zona</h2>
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

                <label htmlFor="details">
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

                <br></br>
                <button className="formSubmitButton" disabled={!validName ? true : false}>Registrar</button>


            </form>
        </>
    )

    return content
}
export default NewZoneForm