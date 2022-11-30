import React from 'react'
import '../users/register.css'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay} from "@fortawesome/free-solid-svg-icons"
import Cookies from '../users/Cookies';

const Welcome = () => {

    const content = (
            <body className='bodyWelcome'>

                <section id="hero">
                    <h1>Unidos por la clasificación</h1>   
                </section>

                <section id="somos-proya">
                    <div className="container">
                        <div className="img-container"></div>
                        <div className="texto">
                            <h2><span className="color-acento">Quiénes somos</span></h2>
                            <p>Somos una cooperativa social del departamento de Paysandú, formada el 2 de mayo del 2013, hoy conformada por 5 integrantes. </p>
                        </div>
                    </div>
                </section>

                <section id="nuestros-programas">
                    <div className="container">
                        <h2>Nuestro trayecto</h2>
                        <div className="programas">
                            <div className="carta">
                                <h3>2013</h3><br></br><br></br>
                                <button className='buttonWelcome'>En un principio la recolección se realizaba a carro, en un circuito establecido por nosotros. La materia prima se vendía a granel.</button>
                            </div>
                            <div className="carta">
                                <h3>2014</h3><br></br><br></br>
                                <button className='buttonWelcome'>Comenzamos a procesar y enfardar materia prima, vendiendo fardos de cartón y plástico (PET).</button>
                            </div>
                            
                            <div className="carta">
                                <h3>2018</h3><br></br><br></br>
                                <button className='buttonWelcome'>Comenzamos a realizar la recolección de residuos reciclabes, como un servicio que le prestabamos a la intendencia de Paysandú, conocido como circuito limpio.</button>
                            </div>  
                        </div>
                    </div>
                </section>


                <section id="caracteristicas">
                <h2>Con nuestra aplicación podrás...</h2>
                    <button className='buttonLista'>✔️ Ponerte en contacto con la cooperativa.</button>
                    <button className='buttonLista'>✔️ Registrar un punto de recolección.</button>
                    <button className='buttonLista'>✔️ Editar la información del punto de recolección.</button>
                    <div className="container">
                       
                    </div>
                </section>


                <section id="final">
                    <h2>¿Necesitas ayuda?</h2>

                        <a href='https://www.youtube.com/embed/CAyg1kcw58w' target="_blank">
                        <button className='buttonVideo'><FontAwesomeIcon icon={faCirclePlay} /> Tutorial: Cómo crear un punto de recolección</button>
                        </a>
                       
                        <h6>Por más información, contáctanos a coopesocialunidos@gmail.com</h6>
                </section>
                <footer>
                    <div className="container">
                       <p><a href="/dash/users/cookies">Cookies</a></p>
                       <p><a href="/dash/users/privacy">Política de privacidad</a></p>
                    </div>
                </footer>
            
            </body>

    )

    return content
}

export default Welcome
