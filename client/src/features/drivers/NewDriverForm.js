import { useRef, useState, useEffect } from "react"
import { useAddNewDriverMutation } from "./driversApiSlice"
import { useNavigate } from "react-router-dom"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;

const NewDriverForm = () => {

    const [addNewDriver, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewDriverMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [surname, setSurname] = useState('')
    const [validSurname, setValidSurname] = useState(false)
    const [surnameFocus, setSurnameFocus] = useState(false);

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

    const canSave = [validName, validSurname].every(Boolean) && !isLoading

    const onSaveDriverClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewDriver({ name, surname})
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveDriverClicked}>
                <div className="formTitleRow">
                    <h2>Registro de Chofer</h2>
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

                <label htmlFor="surname">
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

               

            </form>
        </>
    )

    return content
}
export default NewDriverForm