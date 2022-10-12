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

            {(isAdmin) && <p><Link to="/dash/users">Administración de Usuarios</Link></p>}

            {(isAdmin) && <p><Link to="/dash/routes">Gestión de recorridos</Link></p>}

            {(isAdmin) && <p><Link to="/dash/users">Gestión de puntos</Link></p>}

            {(isAdmin) && <p><Link to="/dash/drivers">Gestión de choferes</Link></p>}

            {(isCEV) && <p><Link to="/dash/recolectCEV">Alta de punto de recolección para CEV</Link></p>}

            {(isEmpresa) && <p><Link to="/dash/recolectEmp">Alta de punto de recolección para Empresas</Link></p>}

        </section>
    )

    return content
}

export default Welcome
