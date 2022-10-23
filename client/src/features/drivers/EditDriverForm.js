import { useRef, useState, useEffect } from "react"
import { useUpdateDriverMutation} from "./driversApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;

const EditDriverForm = ({ driver }) => {

    const [updateDriver, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateDriverMutation()

    // const [deleteDriver, {
    //     isSuccess: isDelSuccess,
    //     isError: isDelError,
    //     error: delerror
    // }] = useDeleteDriverMutation()

    const navigate = useNavigate()
    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name, setName] = useState(driver.name)
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [surname, setSurname] = useState(driver.surname)
    const [validSurname, setValidSurname] = useState(false)
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [active, setActive] = useState(driver.active)

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_SURNAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(NAME_SURNAME_REGEX.test(surname));
    }, [surname])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setSurname('')
            navigate('/dash/drivers')
        }

    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    
    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveDriverClicked = async (e) => {
        await updateDriver({ id: driver.id, name, surname, active })
    }

    // const onDeleteDriverClicked = async () => {
    //     await deleteDriver({ id: driver.id })
    // }

    let canSave = [validName, validSurname].every(Boolean) && !isLoading

    const errClass = (isError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <main className='editDriver'>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="formTitleRow">
                        <h2>Editar chófer</h2>
                        <div className="formActionButtons">
                            {/* <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveDriverClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button> */}
                            {/* <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteDriverClicked}
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

                    <label className="formLabel" htmlFor="surname">
                        Apellido: 
                        <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                    </label>
                    <input
                        className={`formInput`}
                        id="surname"
                        name="surname"
                        type="text"
                        autoComplete="off"
                        value={surname}
                        onChange={onSurnameChanged}
                        required
                        aria-invalid={validSurname ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setSurnameFocus(true)}
                        onBlur={() => setSurnameFocus(false)}
                    />
                    <p id="uidnote" className={surnameFocus && surname && !validSurname? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        2 a 15 caracteres.<br />
                        Debe empezar y contener solo letras.<br />
                    </p>
                    <label className="formLabel formCheckboxContainer" htmlFor="driver-active">
                        ACTIVO:
                        <input
                            className="formCheckbox"
                            id="driver-active"
                            name="driver-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>
                    
                    <button className="formSubmitButton" onClick={onSaveDriverClicked} disabled={!validName || !validSurname ? true : false}>Guardar cambios</button>

                </form>
            </main>
        </>
    )

    return content
}
export default EditDriverForm