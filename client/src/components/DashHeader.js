import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './Header.css';


const DashHeader = () => {

    const { name, surname, isAdmin, isCEV, isEmpresa, isRecolector } = useAuth()

    const navigate = useNavigate()


    const [sendLogout, {
        isSuccess
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const content = (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                <img id="header-img" src={require('../img/logoUC.PNG')} alt={"UPC"} />
                    <Navbar.Brand href="/dash"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Navbar.Brand><Nav.Link href="/dash">Inicio</Nav.Link></Navbar.Brand>
                            {(isAdmin) && <Navbar.Brand>  <NavDropdown title="Usuarios" id="basic-nav-dropdown" >
                           <NavDropdown.Item href="/dash/users/new">Crear usuario</NavDropdown.Item>
                              <NavDropdown.Item href="/dash/users">Listar usuarios</NavDropdown.Item>
                            </NavDropdown></Navbar.Brand>}

                            {(isAdmin) && <Navbar.Brand><NavDropdown title="Choferes" id="basic-nav-dropdown" >
                             <NavDropdown.Item href="/dash/drivers/new">Crear chofer</NavDropdown.Item>
                             <NavDropdown.Item href="/dash/drivers">Listar choferes</NavDropdown.Item>
                            </NavDropdown></Navbar.Brand>}

                            {(isAdmin) && <Navbar.Brand><NavDropdown title="Zonas" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/dash/zones/new">Crear Zona</NavDropdown.Item>
                            <NavDropdown.Item href="/dash/zones">Listar Zonas</NavDropdown.Item>
                            </NavDropdown></Navbar.Brand>}

                            {(isAdmin || isEmpresa || isCEV) &&<Navbar.Brand><NavDropdown title="Puntos" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/dash/points/new">Crear Punto</NavDropdown.Item>
                            <NavDropdown.Item href="/dash/points">Listar Puntos</NavDropdown.Item>
                            </NavDropdown></Navbar.Brand>}

                            {(isAdmin || isRecolector ) && <Navbar.Brand><NavDropdown title="Recorridos" id="basic-nav-dropdown" >
                          <NavDropdown.Item href="/dash/routes/new">Crear Recorrido</NavDropdown.Item>
                            {/* <Navbar.Brand> <NavDropdown.Item onClick={sendLogout}>Validar Rutas</NavDropdown.Item></Navbar.Brand> */}
                          <NavDropdown.Item href="/dash/routes">Listar Recorridos</NavDropdown.Item>
                            </NavDropdown></Navbar.Brand>}

                            <Navbar.Brand><NavDropdown title={name+' '+surname} id="basic-nav-dropdown-last">
                                <NavDropdown.Item onClick={sendLogout}>Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown></Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
           
            {/* <header className="dashHeader">
                <div className={`dashHeaderContainer ${dashClass}`}>

                    <Link to="/dash">
                        {/* <h1 className="dashHeaderTitle">Unidos por la clasificación</h1> */}
                    {/* </Link> */}
                    {/* <nav className="dashHeaderNav">
                        {buttonContent}
                    </nav> */}
{/*
                </div>
            </header> */}

           

        </>

    )

    return content
}

export default DashHeader