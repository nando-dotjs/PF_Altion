import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if(pathname !== '/dash'){
        goHomeButton = (
            <button
                className="dashFooterButton iconButton"
                title="Inicio"
                onClick={onGoHomeClicked}
                >
                <FontAwesomeIcon icon={faHouse}/>
                </button>
        )
    }

    const content = (
        <footer className="dashFooter">
            {goHomeButton}
            <p>Usuario actual: {username}</p>
            <p>Estado:{status}</p>
        </footer>
    )
    return content
}

export default DashFooter
