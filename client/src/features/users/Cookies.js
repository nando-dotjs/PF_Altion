import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import './register.css'
import './Table.css';
import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const Cookies = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate('/dash');
    };

    function onClickVolver(){
        navigate('/dash');
    }

    return (
        <Modal 
        show={!show} 
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        
      centered
        
        >
                <Modal.Header closeButton>
                    <Modal.Title id="cabezal"><strong>Uso de Cookies</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
       
           
            <Container>
                
        <div>
           
            <Container>
           
                <h3><strong>Cookies y otras tecnologías de almacenamiento.</strong></h3>
               <p> Las cookies son pequeños fragmentos de texto que se utilizan para almacenar información en los navegadores web. Se usan para almacenar y recibir identificadores e información adicional en ordenadores, teléfonos y otros dispositivos. Otras tecnologías, incluidos datos que almacenamos en tu navegador web o tu dispositivo, identificadores asociados a tu dispositivo y otro software, se utilizan con fines similares. A efectos de esta política, todas estas tecnologías reciben el nombre de “cookies”.
                Utilizamos cookies en los siguientes casos: si tienes una cuenta de UPC, si usas el producto UPC (incluido nuestro sitio web y nuestra aplicacion) o si visitas otros sitios web y aplicaciones que utilicen el producto UPC.
                En esta política se describe el uso que hacemos de las cookies y las opciones de las que dispones. Salvo que se indique lo contrario en el presente documento, trataremos los datos que recopilemos a través de las cookies conforme a la ley 18331 “Ley de protección de datos personales” vigente para la República Oriental del Uruguay.</p>
                <br/>
                <br/>
                <h3><strong>¿Por qué utilizamos cookies?</strong></h3> 
                <p>Las cookies nos ayudan a proporcionar, proteger y mejorar el producto; por ejemplo, nos permiten personalizar el contenido y ofrecer una experiencia más segura. Entre las cookies que usamos se incluyen las de sesión, que se eliminan cuando cierras el navegador, y las persistentes, que permanecen en el navegador hasta que caducan o las eliminas. Aunque las cookies que utilizamos pueden cambiar de vez en cuando a medida que mejoramos y actualizamos el producto, las utilizamos con los siguientes fines:
                Autenticación
                Utilizamos cookies para verificar tu cuenta y determinar si has iniciado sesión, con el objetivo de ayudarte a acceder y mostrarte la experiencia y las funciones adecuadas.</p>
                <br/>
                <br/>
                <h3><strong> ¿Dónde utilizamos las cookies?</strong></h3>
                <p>Podemos almacenar cookies en tu ordenador o dispositivo, y recibir información almacenada en ellas cuando utilices o visites


                la página Web www.unidosporlaclasificacion.com</p>

                {/* <button className='btn btn-success' onClick={onClickVolver}>Volver</button> */}



            
            </Container>
        </div>
        </Container>
      </Modal.Body>
               <Modal.Footer>
                   {/* <Button variant="secondary" onClick={handleClose}>
                   Cancelar
        //             </Button>
        //             <Button variant="primary" onClick={onSaveUserClicked} disabled={!role || !validMail || !name || !surname ? true : false}>
        //                 Guardar cambios
        //             </Button> */}
               </Modal.Footer>
          </Modal>
        
    )
}

export default Cookies