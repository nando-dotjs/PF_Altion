import { useRef, useState, useEffect } from "react"
import { useAddNewZoneMutation } from "./zonesApiSlice"
import { useNavigate } from "react-router-dom"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import '../users/register.css'
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ1-9\ ]{2,15}$/;

const NewZoneForm = () => {

    const [addNewZone, {
        isLoading,
        isSuccess,
        isError,
        error
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
        if (canSave) {
            await addNewZone({ name, details })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(true)
    navigate('/dash');
}
    ;

    const content = (
        <>
           <Modal show={!show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="cabezal"><strong>Nueva Zona</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <div className="account-wall" align="center"> */}

                <Container fluid>
                    <p className={errClass}>{error?.data?.message}</p>

                    <form className="form" onSubmit={onSaveZoneClicked}>
                        <div className="formTitleRow">
                            {/* <h1 id="cabezal">Registro de Zona</h1> */}
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
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <input
                                        className="form-control"
                                        placeholder="Nombre de la zona"
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
                        <br />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
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
                        </div>
                        <label htmlFor="details" id="iconito">
                            <FontAwesomeIcon icon={faCheck} className={validDetails ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validDetails || !details ? "hide" : "invalid"} />
                        </label>
                        </div>
                        </div>
                        <p id="uidnote" className={detailsFocus && details && !validDetails ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2 a 15 caracteres.<br />
                            Puede contener números y letras.<br />
                        </p>

                        <br></br>
                        {/* <Button className="formSubmitButton" onClick={onSaveZoneClicked} disabled={!validName ? true : false}>Registrar</Button> */}


                    </form>
                    <br />
                </Container>
            {/* </div> */}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={onSaveZoneClicked}  disabled={!validName ? true : false}>
           Registrar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )

    return content
}
export default NewZoneForm