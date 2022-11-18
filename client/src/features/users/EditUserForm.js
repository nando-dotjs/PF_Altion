import { useRef, useState, useEffect } from "react"
import { useUpdateUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import './register.css'

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
// eslint-disable-next-line
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    // const [deleteUser, {
    //     isSuccess: isDelSuccess,
    //     // eslint-disable-next-line
    //     isError: isDelError,
    //     error: delerror
    // }] = useDeleteUserMutation()

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
                                icon: 'success',
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
                            icon: 'success',
                            title: response.data.message
                            })
                    }
                })
        }
        // Toast.fire({
        //     icon: 'info',
        //     title: 'Usuario Actualizado'
        //   })
    }

    // const onDeleteUserClicked = async () => {
    //     await deleteUser({ id: user.id })
    // }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [role, validPassword, validMail, name, surname].every(Boolean) && !isLoading
    } else {
        canSave = [role, validMail, name, surname].every(Boolean) && !isLoading
    }

    const errClass = isError ? "errmsg" : "offscreen"


    
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
            {/* <div className="account-wall" align="center">
                <Container fluid> */}

                    <form className="form" onSubmit={e => e.preventDefault()}>
                        <div className="formTitleRow">
                            {/* <h1 id="cabezal">Editar Usuario</h1> */}
                            <div className="formActionButtons">
                            </div>
                        </div>

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
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
                                </div>
                                {/* <div class="col-3 col-md-1" id="iconito"> */}
                                <label htmlFor="name" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                                </label>
                                {/* </div> */}
                            </div>
                        </div>
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2 a 15 caracteres.<br />
                            Debe empezar y contener solo letras.<br />
                        </p>
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">

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
                                </div>
                                <label htmlFor="surname" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                                </label>

                            </div>
                        </div>
                        <p id="uidnote" className={surnameFocus && surname && !validSurname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2 a 15 caracteres.<br />
                            Debe empezar y contener solo letras.<br />
                        </p>
                        <br />

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
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
                                </div>
                                <label htmlFor="mail" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validMail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMail || !mail ? "hide" : "invalid"} />
                                </label>

                            </div>
                        </div>
                        <p id="uidnote" className={mailFocus && mail && !validMail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Ingrese un correo electrónico válido.<br />
                        </p>
                        <br />

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
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
                                </div>
                                <label htmlFor="password" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} id="pass" className={validPassword ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} id="pass" className={validPassword || !password ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>

                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
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
                                </div>
                                <label htmlFor="confirm_pwd" id="iconito">
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                </label>
                            </div>
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            La contraseña debe coincidir con el primer campo
                        </p>

                        <br />


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
                        <br/>
                        <br/>
                        <Form.Select
                            id="role"
                            name="role"
                            className={`formSelect`}
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            {options}
                        </Form.Select>
                        <br />
                        <br />
                        {/* <Button className="formSubmitButton" onClick={onSaveUserClicked} disabled={!role || !validMail || !name || !surname ? true : false}>Guardar cambios</Button> */}
                        <br />
                        <br />
                    </form>
                {/* </Container>
                
            </div> */}
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