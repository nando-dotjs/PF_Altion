import './register.css'

import { Button, Modal } from 'react-bootstrap';
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { selectUserById } from "./usersApiSlice"
import { useSelector } from 'react-redux'

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
// eslint-disable-next-line
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

const ViewUserForm = () => {
    let { id } = useParams();
    
    const user = useSelector(state => selectUserById(state, id))

    const navigate = useNavigate()

    const userRef = useRef();

    // eslint-disable-next-line
    const errRef = useRef();

    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');

    // eslint-disable-next-line
    const [success, setSuccess] = useState(false);

    const [name] = useState(user.name)

    const [surname] = useState(user.surname)

    const [mail] = useState(user.mail)

    const [role] = useState(user.role)

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        document.title = 'Ver Usuario';
    });

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate('/dash/users');
    };

    const content = (
        <>
                <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="cabezal"><strong>Ver Usuario</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form" onSubmit={e => e.preventDefault()}>
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
                                        value={name}
                                    />
                                </div>
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
                                        value={surname}
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
                                        value={mail}
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
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
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