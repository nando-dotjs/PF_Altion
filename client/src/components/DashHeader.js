import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faPlus,
    faArrowLeft

} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Navbar from 'react-bootstrap';


// import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const CEVS_REGEX = /^\/dash\/cevs(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const DRIVERS_REGEX = /^\/dash\/drivers(\/)?$/
const COMPANY_REGEX = /^\/dash\/companys(\/)?$/
const ZONES_REGEX = /^\/dash\/zones(\/)?$/
const POINT_REGEX = /^\/dash\/points(\/)?$/
const ROUTES_REGEX = /^\/dash\/users(\/)?$/

const USERS_EDIT_REGEX = /^\/dash\/users(\/.+)?$/
const DRIVERS_EDIT_REGEX = /^\/dash\/drivers(\/.+)?$/
const CEVS_EDIT_REGEX = /^\/dash\/cevs(\/.+)?$/
const COMPANY_EDIT_REGEX = /^\/dash\/companys(\/.+)?$/
const ZONE_EDIT_REGEX = /^\/dash\/zones(\/.+)?$/
const POINT_EDIT_REGEX = /^\/dash\/points(\/.+)?$/

const DashHeader = () => {

    const { mail, role, isAdmin, isCEV, isEmpresa } = useAuth()

    // const { isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewUserClicked = () => navigate(`/dash/users/new`)
    const onGoBackUser = () => navigate('/dash')
    const onGoBackUserToTable = () => navigate('/dash/users')

    const onNewDriverClicked = () => navigate('/dash/drivers/new')
    const onGoBackDriver = () => navigate('/dash')
    const onGoBackDriverToTable = () => navigate('/dash/drivers')

    const onNewCevClicked = () => navigate('/dash/cevs/new')
    const onGoBackCEV = () => navigate('/dash')
    const onGoBackCEVToTable = () => navigate('/dash/cevs')

    const onNewCompanyClicked = () => navigate('/dash/companys/new')
    const onGoBackCompany = () => navigate('/dash')
    const onGoBackCompanyToTable = () => navigate('/dash/companys')

    const onNewZoneClicked = () => navigate('/dash/zones/new')
    const onGoBackZone = () => navigate('/dash')
    const onGoBackZoneToTable = () => navigate('/dash/zones')

    const onNewPointClicked = () => navigate('/dash/points/new')
    const onGoBackPoint = () => navigate('/dash')
    const onGoBackPointToTable = () => navigate('/dash/points')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !CEVS_REGEX.test(pathname) && !COMPANY_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !DRIVERS_REGEX.test(pathname) && !ZONES_REGEX.test(pathname)) {
        dashClass = "dashHeaderContainer--small"
    }

    let newUserButton = null
    let goBackFromUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
        goBackFromUserButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onGoBackUser}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let goBackFromUserToTable = null
    if (USERS_EDIT_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        goBackFromUserToTable = (
            <button
                className="icon-button"
                title="Go back table"
                onClick={onGoBackUserToTable}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let newDriverButton = null
    let goBackFromDriverButton = null;
    if (DRIVERS_REGEX.test(pathname)) {
        newDriverButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onNewDriverClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
        goBackFromDriverButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onGoBackDriver}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let goBackFromDriverToTable = null
    if (DRIVERS_EDIT_REGEX.test(pathname) && !DRIVERS_REGEX.test(pathname)) {
        goBackFromDriverToTable = (
            <button
                className="icon-button"
                title="Go back table"
                onClick={onGoBackDriverToTable}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let newCevButton = null
    let goBackFromCevButton = null;
    if (CEVS_REGEX.test(pathname)) {
        newCevButton = (
            <button
                className="icon-button"
                title="New Cev"
                onClick={onNewCevClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
        goBackFromCevButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onGoBackCEV}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let goBackFromCEVToTable = null
    if (CEVS_EDIT_REGEX.test(pathname) && !CEVS_REGEX.test(pathname)) {
        goBackFromCEVToTable = (
            <button
                className="icon-button"
                title="Go back table"
                onClick={onGoBackCEVToTable}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let newCompanyButton = null;
    let goBackFromCompanyButton = null;
    if (COMPANY_REGEX.test(pathname)) {
        newCompanyButton = (
            <button
                className="icon-button"
                title="New Company"
                onClick={onNewCompanyClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
        goBackFromCompanyButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onGoBackCompany}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let goBackFromCompanyToTable = null
    if (COMPANY_EDIT_REGEX.test(pathname) && !COMPANY_REGEX.test(pathname)) {
        goBackFromCompanyToTable = (
            <button
                className="icon-button"
                title="Go back table"
                onClick={onGoBackCompanyToTable}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let newZoneButton = null
    let goBackFromZoneButton = null;
    if (ZONES_REGEX.test(pathname)) {
        newZoneButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onNewZoneClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
        goBackFromZoneButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onGoBackZone}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let goBackFromZoneToTable = null
    if (ZONE_EDIT_REGEX.test(pathname) && !ZONES_REGEX.test(pathname)) {
        goBackFromZoneToTable = (
            <button
                className="icon-button"
                title="Go back table"
                onClick={onGoBackZoneToTable}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    // let userButton = null
    // if (isAdmin) {
    //     if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
    //         userButton = (
    //             <button
    //                 className="icon-button"
    //                 title="Users"
    //                 onClick={onUsersClicked}
    //             >
    //                 <FontAwesomeIcon icon={faUserGear} />
    //             </button>
    //         )
    //     }
    // }

    let newPointButton = null;
    let goBackFromPointButton = null;
    if (POINT_REGEX.test(pathname)) {
        newPointButton = (
            <button
                className="icon-button"
                title="New Point"
                onClick={onNewPointClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
        goBackFromPointButton = (
            <button
                className="icon-button"
                title="Go back"
                onClick={onGoBackPoint}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    let goBackFromPointToTable = null
    if(POINT_EDIT_REGEX.test(pathname) && !POINT_REGEX.test(pathname)) {
        goBackFromPointToTable = (
            <button
                className="icon-button"
                title="Go back table"
                onClick={onGoBackPointToTable}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )



    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Saliendo...</p>
    } else {
        buttonContent = (
            <>
                {newUserButton}
                {/* {userButton} */}
                {newDriverButton}
                {newCevButton}
                {newCompanyButton}
                {newPointButton}
                {newZoneButton}
                {goBackFromCompanyButton}
                {goBackFromPointButton}
                {goBackFromCevButton}
                {goBackFromDriverButton}
                {goBackFromUserButton}
                {goBackFromZoneButton}

                {/* FORMULARIOS DE EDICION */}
                {goBackFromUserToTable}
                {goBackFromDriverToTable}
                {goBackFromPointToTable}
                {goBackFromCEVToTable}
                {goBackFromCompanyToTable}
                {goBackFromZoneToTable}

                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <Navbar bg="light" expand="lg">
                <Container>
                <img id="header-img" src={require('../img/logoUC.PNG')} />
                    <Navbar.Brand href="/dash"><strong>Unidos por la clasificación</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Navbar.Brand><Nav.Link href="/dash">Inicio</Nav.Link></Navbar.Brand>
                            {(isAdmin) && <Navbar.Brand>  <NavDropdown title="Usuarios" id="basic-nav-dropdown" >
                            <Navbar.Brand><NavDropdown.Item href="/dash/users/new">Crear usuario</NavDropdown.Item></Navbar.Brand>
                            <Navbar.Brand>  <NavDropdown.Item href="/dash/users">Listar usuarios</NavDropdown.Item></Navbar.Brand>
                            </NavDropdown></Navbar.Brand>}

                            {(isAdmin) && <Navbar.Brand><NavDropdown title="Choferes" id="basic-nav-dropdown" >
                            <Navbar.Brand> <NavDropdown.Item href="/dash/drivers/new">Crear chofer</NavDropdown.Item></Navbar.Brand>
                            <Navbar.Brand> <NavDropdown.Item href="/dash/drivers">Listar choferes</NavDropdown.Item></Navbar.Brand>
                            </NavDropdown></Navbar.Brand>}

                            {(isAdmin) && <Navbar.Brand><NavDropdown title="Zonas" id="basic-nav-dropdown" >
                            <Navbar.Brand><NavDropdown.Item href="/dash/zones/new">Crear Zona</NavDropdown.Item></Navbar.Brand>
                            <Navbar.Brand> <NavDropdown.Item href="/dash/zones">Listar Zonas</NavDropdown.Item></Navbar.Brand>
                            </NavDropdown></Navbar.Brand>}

                            <Navbar.Brand><NavDropdown title="Puntos" id="basic-nav-dropdown" >
                            <Navbar.Brand> <NavDropdown.Item href="/dash/points/new">Crear Punto</NavDropdown.Item></Navbar.Brand>
                            <Navbar.Brand> <NavDropdown.Item onClick={sendLogout}>Validar Puntos</NavDropdown.Item></Navbar.Brand>
                            <Navbar.Brand> <NavDropdown.Item href="/dash/points">Listar Puntos</NavDropdown.Item></Navbar.Brand>
                            </NavDropdown></Navbar.Brand>

                        </Nav>
                      
                        <Navbar.Brand><NavDropdown title={mail} id="basic-nav-dropdown" >
                        <Navbar.Brand> <NavDropdown.Item onClick={sendLogout}>Cerrar Sesión</NavDropdown.Item></Navbar.Brand>
                        </NavDropdown></Navbar.Brand>
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