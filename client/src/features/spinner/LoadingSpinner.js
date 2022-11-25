import {useState} from "react";
import "./LoadingSpinner.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';




export default function LoadingSpinner() {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => {
    setShow(true)
    navigate('/dash');
    };

    return (
       <>
         <Modal show={!show} onHide={handleClose} backdrop="static" keyboard={false}>
      
        <Modal.Body>
        <Button variant="primary" disabled/>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
         <ProgressBar now={60} />;
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
        </>
);
   
}