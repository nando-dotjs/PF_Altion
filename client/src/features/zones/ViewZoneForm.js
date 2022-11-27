import { useRef, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from "react-router-dom";
import { selectZoneById } from "./zonesApiSlice";
import { Button, Modal} from 'react-bootstrap';
import '../users/register.css';

// eslint-disable-next-line
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ1-9\ ]{2,15}$/;

const ViewZoneForm = () => {
    let { id } = useParams();

    const zone = useSelector(state => selectZoneById(state, id))

    const navigate = useNavigate()
    const userRef = useRef();
    // eslint-disable-next-line
    const [errMsg, setErrMsg] = useState('');


    const [name] = useState(zone.name)


    const [details] = useState(zone.details)

    useEffect(() => {
        userRef?.current?.focus();
    }, [])
    
    useEffect(() => {
        document.title = 'Ver Zona';
    });

    useEffect(() => {
        setErrMsg('');
    }, [name, details])

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(true)
        navigate('/dash/zones');
    };

    const content = (
        <>
            <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="cabezal"><strong>Ver Zona</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <main className='editZone'>
                        <form className="form" onSubmit={e => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
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
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-10 col-md-8" id="iconito2">
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
                                    />
                                </div>

                            </div>
                        </div>

                        <br></br>

                        </form>
                    </main>

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