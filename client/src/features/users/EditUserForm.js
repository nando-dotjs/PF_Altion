import './register.css'

import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ROLES } from "../../config/roles"
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation } from "./usersApiSlice"

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
// eslint-disable-next-line
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isSuccess
    }] = useUpdateUserMutation()

    const navigate = useNavigate()

    const userRef = useRef();

    // eslint-disable-next-line
    const errRef = useRef();

    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');

    // eslint-disable-next-line
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState(user.name)
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);

    const [surname, setSurname] = useState(user.surname)
    const [validSurname, setValidSurname] = useState(false)
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [mail, setMail] = useState(user.mail)
    const [validMail, setValidMail] = useState(false)
    const [mailFocus, setMailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [role, setRole] = useState(user.role)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        document.title = 'Modificación de Usuario';
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
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname, mail, password, matchPwd])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setSurname('')
            setPassword('')
            setMail('')
            setRole('')
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onMailChanged = e => setMail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {

        if (password) {
            await updateUser({ id: user.id, name, surname, mail, password, role, active })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                            })
                    } else{
                        Toast.fire({
                            icon: 'info',
                            title: response.data.message
                            })
                    }
                })
        } else {
            await updateUser({ id: user.id, name, surname, mail, role, active })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                            })
                    } else{
                        Toast.fire({
                            icon: 'info',
                            title: response.data.message
                            })
                    }
                })
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
   
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate('/dash/users');
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
        popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

    const content = (
        <>
            <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="cabezal"><strong>Editar Usuario</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form" onSubmit={e => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <InputGroup className="mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="Nombre"
                                            type="text"
                                            id="name"
                                            autoComplete="off"
                                            onChange={onNameChanged}
                                            value={name}
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                        />
                                    </InputGroup>
                                    <p id="uidnote" className={nameFocus && name && !validName ? "validation" : "offscreen"}>
                                        2 a 15 caracteres.<br />
                                        Debe empezar y contener solo letras.<br />
                                    </p>
                                </div>
                                <label htmlFor="name" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>
                        
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <InputGroup className="mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="Apellido"
                                            type="text"
                                            id="surname"
                                            autoComplete="off"
                                            onChange={onSurnameChanged}
                                            value={surname}
                                            required
                                            aria-invalid={validSurname ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setSurnameFocus(true)}
                                            onBlur={() => setSurnameFocus(false)}
                                        />
                                    </InputGroup>
                                    <p id="uidnote" className={surnameFocus && surname && !validSurname ? "validation" : "offscreen"}>
                                        2 a 15 caracteres.<br />
                                        Debe empezar y contener solo letras.<br />
                                    </p>
                                </div>
                                <label htmlFor="surname" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                                </label>

                            </div>
                        </div>
                        
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <InputGroup className="mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="Correo Electrónico"
                                            type="text"
                                            id="mail"
                                            autoComplete="off"
                                            onChange={onMailChanged}
                                            value={mail}
                                            required
                                            aria-invalid={validMail ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setMailFocus(true)}
                                            onBlur={() => setMailFocus(false)}
                                        />
                                    </InputGroup>
                                    <p id="uidnote" className={mailFocus && mail && !validMail ? "validation" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Ingrese un correo electrónico válido.<br />
                                    </p>
                                </div>
                                <label htmlFor="mail" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validMail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMail || !mail ? "hide" : "invalid"} />
                                </label>

                            </div>
                        </div>
            

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                <InputGroup className="mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Contraseña"
                                        type="password"
                                        id="password"
                                        onChange={onPasswordChanged}
                                        value={password}
                                        required
                                        aria-invalid={validPassword ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                </InputGroup>
                                    <p id="pwdnote" className={pwdFocus && !validPassword ? "validation" : "offscreen"}>
                                        8 a 24 caracteres.<br />
                                        Debe incluir mayúscula, minúscula, un número y un caracter especial.<br />
                                        Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </div>
                                <label htmlFor="password" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} id="pass" className={validPassword ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} id="pass" className={validPassword || !password ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                <InputGroup className="mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Confirmar contraseña"
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
                                </InputGroup>
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "validation" : "offscreen"}>
                                        La contraseña debe coincidir con el primer campo
                                    </p>
                                </div>
                                <label htmlFor="confirm_pwd" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>
                
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <label className="formLabel formCheckboxContainer" htmlFor="user-active">
                                        ACTIVO:
                                        <input
                                            className="form-check-input"
                                            id="user-active"
                                            name="user-active"
                                            type="checkbox"
                                            checked={active}
                                            onChange={onActiveChanged}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <Form.Select
                                        id="role"
                                        name="role"
                                        className={`formSelect`}
                                        value={role}
                                        onChange={e => setRole(e.target.value)}>
                                            {options}
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSaveUserClicked} disabled={!role || !validMail || !name || !surname ? true : false}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return content
}
export default EditUserForm