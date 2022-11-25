import React from 'react'
import "./MapPopup.css"
import MapContainer from "./MapContainer"
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const MapPopup = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (props.trigger) ? (
        <>
        {/* <Button variant="primary" onClick={handleShow}>
       Seleccionar Punto
      </Button> */}

      <Modal show={!show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Localizar ubicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Arrastre el indicador hacia el punto de recolección.</p>
        <MapContainer lat={props.lat} lng={props.lng} isEditable={true} latlng={props.latlng} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={props.latlng === null} onClick={(e) => {
                        e.preventDefault()
                        props.setTrigger(false)
                        }}>
           Confirmar Ubicación
          </Button>
        </Modal.Footer>
      </Modal>
        {/* <div className="popup">
            <div className="popup-inner">
                <MapContainer lat={props.lat} lng={props.lng} isEditable={true} latlng={props.latlng} />
                <button className="formSubmitButton"
                onClick={(e) => {
                        e.preventDefault()
                        props.setTrigger(false)}}>
                        Seleccionar punto
                </button>
                { props.children }
            </div>
        </div> */}
        </>
    ) : ""
}

export default MapPopup
