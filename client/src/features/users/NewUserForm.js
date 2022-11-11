import { useRef, useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import './register.css'

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2' //Instalar con npm install sweetalert2


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

    // const [username, setUsername] = useState('');
    // const [validUsername, setValidUsername] = useState(false);
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

    // useEffect(() => {
    //     setValidUsername(USER_REGEX.test(username));
    // }, [username])

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
            // setUsername('')
            setPassword('')
            setMail('')
            setRole('')
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onMailChanged = e => setMail(e.target.value)
    // const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const canSave = [role, validPassword, validMail, name, surname].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (name == ""){
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar el nombre'
            })


        } else if (surname == "") {
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar el apellido'
            })
        } else if (mail == "") {
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar el correo electrónico'
            })
        } else if (password == "") {  //COMPRUEBA CAMPOS VACIOS

            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar la contraseña'
            })
            
        }else if (canSave) {
                await addNewUser({ name, surname, mail, password, role })
                        .then((response) => {
                            if(response.error) {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.error.data.message
                                    })
                            } else {
                                Toast.fire({
                                    icon: 'success',
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
    navigate('/dash');
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


  let selectRol = null 
  selectRol = (

    <Form.Select
            id="role"
            name="role"
            className="formSelect"
            value={role}
            
            onChange={(e) => setRole(e.target.value)}
        >
            <option selected  > -- Elige usuario -- </option>
            {
                options
            }
        </Form.Select>


  )


    const content = (
        <>
         <Modal show={!show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="cabezal"><strong>Nuevo Usuario</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Container fluid>

                    <section>

                        {/* <header>
                            <h1 id="cabezal">Registro de usuario</h1>
                        </header> */}

                        <main className='register'>

                            <form className="form" onSubmit={onSaveUserClicked}>


                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-10 col-md-8" id="iconito2">
                                            <input
                                                className="form-control"
                                                placeholder="Nombre"
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
                                                onChange={(e) => setSurname(e.target.value)}
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
                                                onChange={(e) => setMail(e.target.value)}
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
                                                onChange={(e) => setPassword(e.target.value)}
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
                                <p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 a 24 caracteres.<br />
                                    Debe incluir mayúscula, minúscula, un número y un caracter especial.<br />
                                    Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
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
                                <label className="form__label" htmlFor="roles">
                                    Voy a registrar:</label>

                                {selectRol}
                                {/* <Form.Select
                                    id="role"
                                    name="role"
                                    className={`formSelect`}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option selected disabled hidden > -- Elige usuario -- </option>

                                    {
                                    
                                    options
                                    
                                    }
                                </Form.Select> */}

                                {/* <Col>
                                    <br />
                                    <Button className="formSubmitButton" onClick={onSaveUserClicked} disabled={!validUsername || !validPassword || !validMatch ? true : false}>Registrar</Button>
                                    <Button className="btn btn-secondary" href="/">Volver</Button>
                                </Col> */}

                            </form>
                            <br />
                        </main>
                    </section>
                </Container>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={onSaveUserClicked} 
        //   disabled={!validPassword || !validMatch ? true : false}
          >Registrar</Button>
        </Modal.Footer>
      </Modal>
        </>
    )

    return content
}
export default NewUserForm