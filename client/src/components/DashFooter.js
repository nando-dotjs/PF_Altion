import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, useLocation} from 'react-router-dom'

const DashFooter = () => {

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
            <p>Current User:</p>
            <p>Status:</p>
        </footer>
    )
    return content
}

export default DashFooter
