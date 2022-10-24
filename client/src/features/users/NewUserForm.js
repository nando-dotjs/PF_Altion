import { useRef, useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    // const errRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [surname, setSurname] = useState('')
    const [validSurname, setValidSurname] = useState(false)
    const [surnameFocus, setSurnameFocus] = useState(false);


    const [mail, setMail] = useState('')
    const [validMail, setValidMail] = useState(false)
    const [mailFocus, setMailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    
    const [role, setRole] = useState('')

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        document.title = 'Registro de Usuario';
      });

    useEffect(() => {
        setValidName(NAME_SURNAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(NAME_SURNAME_REGEX.test(surname));
    }, [surname])

    useEffect(() => {
        setValidMail(EMAIL_REGEX.test(mail))
    }, [mail])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname, mail, username, password, matchPwd])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setSurname('')
            setUsername('')
            setPassword('')
            setMail('')
            setRole('')
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onMailChanged = e => setMail(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const canSave = [role, validUsername, validPassword, validMail, name, surname].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ name, surname, mail, username, password, role })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="formTitleRow">
                    <h2>Registro</h2>
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

                <label htmlFor="mail">
                    Correo electrónico:
                    <FontAwesomeIcon icon={faCheck} className={validMail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMail || !mail ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput`}
                    id="mail"
                    name="mail"
                    type="text"
                    value={mail}
                    onChange={onMailChanged}
                    required
                    aria-invalid={validMail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setMailFocus(true)}
                    onBlur={() => setMailFocus(false)}
                />
                <p id="uidnote" className={mailFocus && mail && !validMail? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Ingrese un correo electrónico válido.<br />
                </p>

                <label htmlFor="username">
                    Nombre de Usuario:
                    <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 a 24 caracteres.<br />
                    Debe empezar con una letra.<br />
                    Letras, números, guión bajo y guiones permitidos.
                </p>

                <label htmlFor="password">
                    Contraseña:
                    <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                </label>
                <input
                    className={`formInput`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 a 24 caracteres.<br />
                    Debe incluir mayúscula, minúscula, un número y un caracter especial.<br />
                    Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirmar contraseña:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>

                <input
                    className="formInput"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    La contraseña debe coincidir con el primer campo
                </p>

                

                <label className="formLabel" htmlFor="roles">
                    Rol:</label>
                <select
                    id="role"
                    name="role"
                    className={`formSelect`}
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    <option disabled={true} value="">
                    --Seleccione un rol--
                    </option>
                    {options}
                </select>

                <br/>

                <button
                    className="formSubmitButton"
                    title="Save"
                    disabled={!canSave}
                >Crear Usuario</button>
            </form>
        </>
    )

    return content
}
export default NewUserForm