import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
    
    const { username, isAdmin, isCEV, isEmpresa } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Bienvenido {username}</h1>

            {(isAdmin) && <p><Link to="/dash/users">Gestion de Usuarios</Link></p>}
            {(isAdmin) && <p><Link to="/dash/drivers">Gestión de Choferes</Link></p>}
            {(isAdmin || isCEV) && <p><Link to="/dash/notes">Gestión de CEVs</Link></p>}


        </section>
    )

    return content
}

export default Welcome
