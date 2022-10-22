import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faRightFromBracket,
    faPlus,
    faArrowLeft

} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

// import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const CEVS_REGEX = /^\/dash\/cevs(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const DRIVERS_REGEX = /^\/dash\/drivers(\/)?$/
const COMPANY_REGEX = /^\/dash\/companys(\/)?$/

const USERS_EDIT_REGEX = /^\/dash\/users(\/.+)?$/
const DRIVERS_EDIT_REGEX = /^\/dash\/drivers(\/.+)?$/

const CEVS_EDIT_REGEX = /^\/dash\/cevs(\/.+)?$/
const COMPANY_EDIT_REGEX = /^\/dash\/companys(\/.+)?$/


const DashHeader = () => {

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

    const onNewUserClicked = () => navigate('/dash/users/new')
    const onGoBackUser = () => navigate('/dash')
    const onGoBackUserToTable = () => navigate ('/dash/users')

    const onNewDriverClicked = () => navigate('/dash/drivers/new')
    const onGoBackDriver = () => navigate('/dash')
    const onGoBackDriverToTable = () => navigate('/dash/drivers')

    const onNewCevClicked = () => navigate('/dash/cevs/new')
    const onGoBackCEV = () => navigate('/dash')
    const onGoBackCEVToTable = () => navigate('/dash/cevs')


    const onNewCompanyClicked = () => navigate('/dash/companys/new')
    const onGoBackCompany = () => navigate('/dash')
    const onGoBackCompanyToTable = () => navigate('/dash/companys')


    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !CEVS_REGEX.test(pathname) && !COMPANY_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !DRIVERS_REGEX.test(pathname)) {
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
    if(USERS_EDIT_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
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
    if(DRIVERS_EDIT_REGEX.test(pathname) && !DRIVERS_REGEX.test(pathname)) {
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
    if(CEVS_EDIT_REGEX.test(pathname) && !CEVS_REGEX.test(pathname)) {
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
    if(COMPANY_EDIT_REGEX.test(pathname) && !COMPANY_REGEX.test(pathname)) {
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
                {goBackFromCompanyButton}
                {goBackFromCevButton}
                {goBackFromDriverButton}
                {goBackFromUserButton}

                {/* FORMULARIOS DE EDICION */}
                {goBackFromUserToTable}
                {goBackFromDriverToTable}
                {goBackFromCEVToTable}
                {goBackFromCompanyToTable}
                
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dashHeader">
                <div className={`dashHeaderContainer ${dashClass}`}>
                
                    <Link to="/dash">
                        <h1 className="dashHeaderTitle">Unidos por la clasificación</h1>
                    </Link>
                    <nav className="dashHeaderNav">
                        {buttonContent}
                    </nav>
                    
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader