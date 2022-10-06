import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
    
    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Bienvenidos!</h1>

            <p><Link to="/dash/routes">Recorridos</Link></p>

            <p><Link to="/dash/users">Ajustes de Usuario</Link></p>

        </section>
    )

    return content
}

export default Welcome
