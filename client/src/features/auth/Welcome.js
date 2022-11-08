import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import './register.css'
import '../users/register.css'

const Welcome = () => {

    const { username, isAdmin, isCEV, isEmpresa } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <Container>
            <section className="welcome">
                {/* <div id="fechaDiv">

                    <p align="right">{today}</p> */}

                    {/* <h1>Bienvenido {username}</h1> */}

                    {/* {(isAdmin) && <p><Link to="/dash/users">Gestion de Usuarios</Link></p>}
            {(isAdmin) && <p><Link to="/dash/drivers">Gestión de Choferes</Link></p>}
            {(isAdmin) && <p><Link to="/dash/zones">Gestión de Zonas</Link></p>}
            {(isCEV) && <p><Link to="/dash/cevs">Gestión de Puntos</Link></p>}
            {(isEmpresa) && <p><Link to="/dash/companys">Gestión de Puntos</Link></p>}
            {(isAdmin) && <p><Link to="/dash/cevs">Gestión de Puntos (CEV)</Link></p>}
            {(isAdmin) && <p><Link to="/dash/companys">Gestión de Puntos (Empresa)</Link></p>}
            {(isAdmin || isCEV || isEmpresa) && <p><Link to="/dash/points">Gestión de Puntos</Link></p>} */}

                {/* </div> */}
            </section>
            <img id="welcome-img" src={require('../../img/logoUC.PNG')} />
        </Container>

    )

    return content
}

export default Welcome
