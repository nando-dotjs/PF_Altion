import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
    
    const { username, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Bienvenido {username}</h1>

            <p><Link to="/dash/routes">Recorridos</Link></p>

            {(isAdmin) && <p><Link to="/dash/users">Lista de Usuarios</Link></p>}

        </section>
    )

    return content
}

export default Welcome
