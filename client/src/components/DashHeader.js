import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUserGear,
    faUserPlus,
    faRightFromBracket,
    faPlus

} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const CEVS_REGEX = /^\/dash\/cevs(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const DRIVERS_REGEX = /^\/dash\/drivers(\/)?$/
const COMPANY_REGEX = /^\/dash\/companys(\/)?$/

const DashHeader = () => {

    const { isAdmin } = useAuth()

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
    const onUsersClicked = () => navigate('/dash/users')
    const onNewDriverClicked = () => navigate('/dash/drivers/new')
    const onNewCevClicked = () => navigate('/dash/cevs/new')
    const onNewCompanyClicked = () => navigate('/dash/companys/new')


    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !CEVS_REGEX.test(pathname) && !COMPANY_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !DRIVERS_REGEX.test(pathname)) {
        dashClass = "dashHeaderContainer--small"
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let newDriverButton = null
    if (DRIVERS_REGEX.test(pathname)) {
        newDriverButton = (
            <button
                className="icon-button"
                title="New Driver"
                onClick={onNewDriverClicked}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        )
    }

    let newCevButton = null
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
    }

    let newCompanyButton = null
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
    }

    let userButton = null
    if (isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
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
                {userButton}
                {logoutButton}
                {newDriverButton}
                {newCevButton}
                {newCompanyButton}
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