import { useRef, useState, useEffect } from "react"
import { useUpdateDriverMutation,selectDriverById } from "./driversApiSlice"
import { useNavigate,useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import '../users/register.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2' //Instalar con npm install sweetalert2
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux'
// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;

const ViewDriverForm = () => {
    let { id } = useParams();

    const driver = useSelector(state => selectDriverById(state, id))

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
        document.title = 'Ver Chofer';
    });

    useEffect(() => {
        setValidName(NAME_SURNAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidSurname(NAME_SURNAME_REGEX.test(surname));
    }, [surname])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname])

  

    // const onDeleteDriverClicked = async () => {
    //     await deleteDriver({ id: driver.id })
    // }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(true)
    navigate('/dash/drivers');
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
          <Modal.Title id="cabezal"><strong>Ver Chofer</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <div className="account-wall" align="center">
                <Container fluid> */}
                    {/* <p className={errClass}>{errContent}</p> */}
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
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-10 col-md-8" id="iconito2">
                                        <strong>Nombre</strong>
                                        <input
                                            disabled
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            value={name}
                                            required
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
                                        <strong>Apellido</strong>
                                        <input
                                            disabled
                                            className="form-control"
                                            id="surname"
                                            name="surname"
                                            type="text"
                                            autoComplete="off"
                                            value={surname}
                                            required
                                      
                                            aria-describedby="uidnote"
                                            onFocus={() => setSurnameFocus(true)}
                                            onBlur={() => setSurnameFocus(false)}
                                        />
                                    </div>
                                  
                                </div>
                            </div>
                           
                            {/* <Button className="formSubmitButton" onClick={onSaveDriverClicked} disabled={!validName || !validSurname ? true : false}>Guardar cambios</Button> */}

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
export default ViewDriverForm
