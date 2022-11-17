import { useRef, useState, useEffect } from "react"
import { useUpdateZoneMutation,selectZoneById } from "./zonesApiSlice"
import { useNavigate,useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import '../users/register.css'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux'
// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ1-9\ ]{2,15}$/;

const ViewZoneForm = () => {
    let { id } = useParams();

    const zone = useSelector(state => selectZoneById(state, id))

    const navigate = useNavigate()
    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name, setName] = useState(zone.name)
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false);


    const [details, setDetails] = useState(zone.details)
    const [validDetails, setValidSurname] = useState(false)
    const [detailsFocus, setDetailsFocus] = useState(false);

    const [active, setActive] = useState(zone.active)

    useEffect(() => {
        userRef?.current?.focus();
    }, [])
    
    useEffect(() => {
        document.title = 'Ver Zona';
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


    // const onDeleteZoneClicked = async () => {
    //     await deleteZone({ id: zone.id })
    // }


    // const errContent = (error?.data?.message) ?? ''

    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(true)
    navigate('/dash/zones');
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
          <Modal.Title id="cabezal"><strong>Ver Zona</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <div className="account-wall" align="center">

                <Container fluid> */}
                
                    <main className='editZone'>

                        <form className="form" onSubmit={e => e.preventDefault()}>
                            <div className="formTitleRow">
                                {/* <h1 id="cabezal">Editar Zona</h1> */}
                                <div className="formActionButtons">
                                    {/* <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveZoneClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button> */}
                                    {/* <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteZoneClicked}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button> */}
                                </div>
                            </div>
                        
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Nombre</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Nombre de la zona"
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="off"
                                        value={name}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-10 col-md-8" id="iconito2">
                                    <strong>Detalle</strong>
                                    <input
                                        disabled
                                        className="form-control"
                                        placeholder="Detalles"
                                        id="details"
                                        name="details"
                                        type="text"
                                        autoComplete="off"
                                        value={details}

                                        aria-invalid={validDetails ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setDetailsFocus(true)}
                                        onBlur={() => setDetailsFocus(false)}
                                    />
                                </div>

                            </div>
                        </div>

                        <br></br>

                            {/* <Button className="formSubmitButton" onClick={onSaveZoneClicked} disabled={!validName ? true : false}>Guardar cambios</Button> */}

                        </form>
                    </main>
                    
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
                export default ViewZoneForm