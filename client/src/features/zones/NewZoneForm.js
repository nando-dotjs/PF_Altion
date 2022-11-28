import '../users/register.css';

import { Button, Container, InputGroup, Modal } from 'react-bootstrap';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import { useAddNewZoneMutation } from "./zonesApiSlice"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ1-9\ ]{2,20}$/;

const NewZoneForm = () => {

    const [addNewZone, {
        isLoading,
        isSuccess,
    }] = useAddNewZoneMutation()

    const navigate = useNavigate()

    const userRef = useRef();

    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);

    const [details, setDetails] = useState('')
    const [validDetails, setValidSurname] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        document.title = 'Registro de Zona';
    });

    useEffect(() => {
        setValidName(NAME_SURNAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(NAME_SURNAME_REGEX.test(details));
    }, [details])

    useEffect(() => {
        setErrMsg('');
    }, [name, details])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDetails('')
            navigate('/dash/zones')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDetailsChanged = e => setDetails(e.target.value)

    const canSave = [validName].every(Boolean) && !isLoading

    const onSaveZoneClicked = async (e) => {
        e.preventDefault()
        if (name === ""){
            Toast.fire({
                icon: 'error',
                position:"top",
                title: 'Debe completar el nombre'
            })

        }else if (canSave) {
            await addNewZone({ name, details })
                .then((response) => {
                    if(response.error){
                        Toast.fire({
                            icon: 'error',
                            title: response.error.data.message
                            })
                    }else{
                        Toast.fire({
                            icon: 'success',
                            title: response.data.message
                            })
                    }
                })
        }
    }

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

    const content = (
        <>
            <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="cabezal"><strong>Nueva Zona</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <form className="form" onSubmit={onSaveZoneClicked}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-10 col-md-8" id="iconito2">
                                        <InputGroup className="mb-3">
                                            <input
                                                className="form-control"
                                                placeholder="Nombre"
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
                                                placeholder="Detalles"
                                                id="details"
                                                name="details"
                                                type="text"
                                                autoComplete="off"
                                                value={details}
                                                onChange={onDetailsChanged}

                                                aria-invalid={validDetails ? "false" : "true"}
                                                aria-describedby="uidnote"
                                                onFocus={() => setDetailsFocus(true)}
                                                onBlur={() => setDetailsFocus(false)}
                                            />
                                        </InputGroup>
                                        <p id="uidnote" className={detailsFocus && details && !validDetails ? "validation" : "offscreen"}>
                                            2 a 20 caracteres.<br />
                                            Puede contener números y letras.<br />
                                        </p>
                                    </div>
                                    <label htmlFor="details" id="iconito">
                                        <FontAwesomeIcon icon={faCheck} className={validDetails ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validDetails || !details ? "hide" : "invalid"} />
                                    </label>
                                </div>
                            </div>
                        </form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSaveZoneClicked}>
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return content
}
export default NewZoneForm