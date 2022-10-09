import { useRef, useState, useEffect } from "react";
import { useCreateNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLES_PUBLICOS } from "../../config/roles"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

const Register = () => {

    const [createNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewUserMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    const errRef = useRef();

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

    const [roles, setRoles] = useState(["Normal"])

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

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
            setMatchPwd('')
            setMail('')
            setRoles([])
            navigate('/login')
        }
    }, [isSuccess, navigate])

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const options = Object.values(ROLES_PUBLICOS).map(role => {
        return (
            <option
                key={role}
                value={role}
            > {role}</option >
        )
    })

    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        const canSave = [roles.length, validUsername, validPassword, validMail, name, surname].every(Boolean) && !isLoading
        try{ 
            if (canSave) {
                await createNewUser({ name, surname, mail, username, password, roles })
            }
        } catch(err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 409) {
                setErrMsg('Mail asociado');
            } else {
                setErrMsg('Failed');
            }
            //errRef.current.focus();
        }
        
    }
    const errClass = isError ? "errmsg" : "offscreen"

    return (
        <>
                <section>
                    <p className={errClass}>{error?.data?.message}</p>
                    <h1>Registro</h1>
                    <form onSubmit={onSaveUserClicked}>

                    <label htmlFor="name">
                            Nombre:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            type="text"
                            id="surname"
                            autoComplete="off"
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
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
                            type="text"
                            id="mail"
                            autoComplete="off"
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
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
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
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
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
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

                        <label htmlFor="roles">
                            Voy a registrar:</label>
                        <select
                            id="roles"
                            name="roles"
                            className={`formSelect ${validRolesClass}`}
                            multiple={true}
                            size="2"
                            value={roles}
                            onChange={onRolesChanged}
                        >
                            {options}
                        </select>

                        <button disabled={!validUsername || !validPassword || !validMatch ? true : false}>Sign Up</button>
                        
                        
                    </form>
                    <p>
                        Ya estás registrado?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/login">Ingresar</a>
                        </span>
                    </p>
                </section>
        </>
    )
}

export default Register