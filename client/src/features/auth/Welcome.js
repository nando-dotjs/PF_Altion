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
            {(isAdmin) && <p><Link to="/dash/zones">Gestión de Zonas</Link></p>}
            {(isCEV) && <p><Link to="/dash/cevs">Gestión de Puntos</Link></p>}
            {(isEmpresa) && <p><Link to="/dash/companys">Gestión de Puntos</Link></p>}
            {(isAdmin) && <p><Link to="/dash/cevs">Gestión de Puntos (CEV)</Link></p>}
            {(isAdmin) && <p><Link to="/dash/companys">Gestión de Puntos (Empresa)</Link></p>}
            

        </section>
    )

    return content
}

export default Welcome
