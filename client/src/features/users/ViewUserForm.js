import { useRef, useState, useEffect } from "react"
import { useUpdateUserMutation,selectUserById } from "./usersApiSlice"
import { useNavigate,useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import './register.css'
import { useSelector } from 'react-redux'

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

const ViewUserForm = () => {
    let { id } = useParams();
    
    const user = useSelector(state => selectUserById(state, id))
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
        document.title = 'Ver Usuario';
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

    

    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onMailChanged = e => setMail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onActiveChanged = () => setActive(prev => !prev)

    

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
          <Modal.Title id="cabezal"><strong>Ver Usuario</strong></Modal.Title>
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

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <strong>Nombre</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Nombre"
                                        type="text"
                                        id="name"
                                        autoComplete="off"
                                        onChange={onNameChanged}
                                        value={name}
                                        required
                                        aria-describedby="uidnote"
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                </div>
                                {/* <div className="col-3 col-md-1" id="iconito"> */}
                                
                                {/* </div> */}
                            </div>
                        </div>
                        
                        <br />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <strong>Apellido</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Apellido"
                                        type="text"
                                        id="surname"
                                        autoComplete="off"
                                        onChange={onSurnameChanged}
                                        value={surname}
                                        required
                                        aria-describedby="uidnote"
                                        onFocus={() => setSurnameFocus(true)}
                                        onBlur={() => setSurnameFocus(false)}
                                    />
                                </div>
                                
                            </div>
                        </div>
                       
                        <br />

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <strong>Correo Electrónico</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Correo Electrónico"
                                        type="text"
                                        id="mail"
                                        autoComplete="off"
                                        onChange={onMailChanged}
                                        value={mail}
                                        required
                                       
                                        aria-describedby="uidnote"
                                        onFocus={() => setMailFocus(true)}
                                        onBlur={() => setMailFocus(false)}
                                    />
                                </div>
                                
                            </div>
                        </div>

                        <br/>

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
                                    <strong>Rol</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Rol"
                                        type="text"
                                        id="role"
                                        autoComplete="off"
                                        value={role}
                                        required
                                       
                                        aria-describedby="uidnote"
                                        onFocus={() => setMailFocus(true)}
                                        onBlur={() => setMailFocus(false)}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    
                        
                    </form>
                {/* </Container>
                
            </div> */}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )

    return content
}
export default ViewUserForm