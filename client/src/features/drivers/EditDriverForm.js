import { useRef, useState, useEffect } from "react"
import { useUpdateDriverMutation } from "./driversApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import '../users/register.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;

const EditDriverForm = ({ driver }) => {

    const [updateDriver, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateDriverMutation()

    // const [deleteDriver, {
    //     isSuccess: isDelSuccess,
    //     isError: isDelError,
    //     error: delerror
    // }] = useDeleteDriverMutation()

    const navigate = useNavigate()
    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name, setName] = useState(driver.name)
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [surname, setSurname] = useState(driver.surname)
    const [validSurname, setValidSurname] = useState(false)
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [active, setActive] = useState(driver.active)

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

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveDriverClicked = async (e) => {
        await updateDriver({ id: driver.id, name, surname, active })
        Toast.fire({
            icon: 'info',
            title: 'Chofer modificado'
          })
    }

    // const onDeleteDriverClicked = async () => {
    //     await deleteDriver({ id: driver.id })
    // }

    let canSave = [validName, validSurname].every(Boolean) && !isLoading

    const errClass = (isError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message) ?? ''
    
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
          <Modal.Title id="cabezal"><strong>Editar Chofer</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <div className="account-wall" align="center">
                <Container fluid> */}
                    <p className={errClass}>{errContent}</p>
                    <main className='editDriver'>

                        <form className="form" onSubmit={e => e.preventDefault()}>
                            <div className="formTitleRow">
                                {/* <h1 id="cabezal">Editar chófer</h1> */}
                                <div className="formActionButtons">
                                    {/* <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveDriverClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button> */}
                                    {/* <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteDriverClicked}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button> */}
                                </div>
                            </div>
                            <br />
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <input
                                            className="form-control"
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
                            <label className="formLabel formCheckboxContainer" htmlFor="driver-active">
                                ACTIVO:
                                <input
                                    className="form-check-input"
                                    id="driver-active"
                                    name="driver-active"
                                    type="checkbox"
                                    checked={active}
                                    onChange={onActiveChanged}
                                />
                            </label>
                            <br/> 
                            <br/> 
                            {/* <Button className="formSubmitButton" onClick={onSaveDriverClicked} disabled={!validName || !validSurname ? true : false}>Guardar cambios</Button> */}

                        </form>
                        <br/> 
                    </main>
                {/* </Container>
            </div> */}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={onSaveDriverClicked} disabled={!validName || !validSurname ? true : false}>Guardar cambios</Button>
          
        </Modal.Footer>
      </Modal>
        </>
    )

    return content
}
export default EditDriverForm
