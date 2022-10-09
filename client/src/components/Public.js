import { Link } from 'react-router-dom'

import React from 'react'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Bienvenidos a <span className="noWrap">Unidos por la Recolección</span></h1>
            </header>
            <main className="publicMain">
                <p>Ciudad de Paysandú</p>
            </main>
            <footer>
                <Link to="/login">Ingresar a la aplicación </Link>
                <br></br>
                <Link to="/register">Registrarse</Link>

            </footer>
        </section>

    )
    return content
}

export default Public
