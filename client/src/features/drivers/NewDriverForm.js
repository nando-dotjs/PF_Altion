import { useRef, useState, useEffect } from "react"
import { useAddNewDriverMutation } from "./driversApiSlice"
import { useNavigate } from "react-router-dom"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import '../users/register.css'
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';

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
            await addNewDriver({ name, surname })
        }
        Toast.fire({
            icon: 'info',
            title: 'Chofer modificado'
          })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(true)
    navigate('/dash');
}
    ;
    const handleShow = () => setShow(true);
    const errClass = isError ? "errmsg" : "offscreen"

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
          <Modal.Title id="cabezal"><strong>Nuevo chofer</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className={errClass}>{error?.data?.message}</p>

            {/* <div className="account-wall" align="center"> */}

                <form className="form" onSubmit={onSaveDriverClicked}>
                    <div className="formTitleRow">
                        {/* <h1 id="cabezal">Registro de Chofer</h1> */}
                        <div className="formActionButtons">
                            {/* <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button> */}
                        </div>
                    </div>
                    <br/> 
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-10 col-md-8" id="iconito2">
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
                            </div>
                            <label htmlFor="name" id="iconito">

                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                            </label>
                        </div>
                    </div>
                    <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        2 a 15 caracteres.<br />
                        Debe empezar y contener solo letras.<br />
                    </p>
                      <br/>      
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-10 col-md-8" id="iconito2">
                            <input
                                className="form-control"
                                placeholder="Apellido"
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

                    <br/>
                    {/* <Button className="formSubmitButton" onClick={onSaveDriverClicked} disabled={!validName || !validSurname ? true : false}>Registrar</Button> */}


                </form>
                <br/>
            {/* </div> */}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={onSaveDriverClicked} disabled={!validName || !validSurname ? true : false}>
           Registrar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )

    return content
}
export default NewDriverForm