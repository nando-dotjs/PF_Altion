import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)

    const [surname, setSurname] = useState('')
    const [validSurname, setValidSurname] = useState(false)

    const [mail, setMail] = useState('')
    const [validMail, setValidMail] = useState(false)

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    
    const [role, setRole] = useState('')

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidName(USER_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidSurname(USER_REGEX.test(surname))
    }, [surname])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidMail(EMAIL_REGEX.test(mail))
    }, [mail])

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
    const validNameClass = !validName ? 'form__input--incomplete' : ''
    const validSurnameClass = !validSurname ? 'form__input--incomplete' : ''
    const validMailClass = !validMail ? 'form__input--incomplete' : ''
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Registro</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="name">
                    Nombre: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="surname">
                    Apellido: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validSurnameClass}`}
                    id="surname"
                    name="surname"
                    type="text"
                    autoComplete="off"
                    value={surname}
                    onChange={onSurnameChanged}
                />

                <label className="form__label" htmlFor="mail">
                    Correo electrónico: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validMailClass}`}
                    id="mail"
                    name="mail"
                    type="text"
                    value={mail}
                    onChange={onMailChanged}
                />

                <label className="form__label" htmlFor="username">
                    Nombre de usuario: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Contraseña: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                

                <label className="form__label" htmlFor="roles">
                    Rol:</label>
                <select
                    id="role"
                    name="role"
                    className={`form__select`}
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default NewUserForm