import React from 'react'
import Container from 'react-bootstrap/Container';
import '../users/register.css'
import './index.css'
const Welcome = () => {

    const content = (
            <body className='bodyWelcome'>

                <section id="hero">
                    <h1>Unidos por la clasificación</h1>   
                </section>

                <section id="somos-proya">
                    <div class="container">
                        <div class="img-container"></div>
                        <div class="texto">

                            <h2>Somos <span class="color-acento">ProgramaYa!</span></h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit veritatis a autem sed dignissimos commodi, voluptas incidunt voluptatibus cum, quia neque nulla consequatur laborum accusamus, perspiciatis odio nemo minus vel!</p>
                        </div>
                    </div>
                </section>

                <section id="nuestros-programas">
                    <div class="container">
                        <h2>Nuestros Programas</h2>
                        <div class="programas">
                            <div class="carta">
                                <h3>Programador Front-end</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero corporis incidunt saepe qui commodi quasi neque veniam quam, aspernatur est beatae maxime animi sed reiciendis mollitia ducimus veritatis repellendus?</p>
                                <button className='buttonWelcome'>+ Info</button>
                            </div>
                            <div class="carta">
                                <h3>Programador Full-Stack</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero corporis incidunt saepe qui commodi quasi neque veniam quam, aspernatur est beatae maxime animi sed reiciendis mollitia ducimus veritatis repellendus?</p>
                                <button className='buttonWelcome'>+ Info</button>
                            </div>
                            <div class="carta">
                                <h3>Programador Python</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero corporis incidunt saepe qui commodi quasi neque veniam quam, aspernatur est beatae maxime animi sed reiciendis mollitia ducimus veritatis repellendus?</p>
                                <button className='buttonWelcome'>+ Info</button>
                            </div>  
                        </div>
                    </div>
                </section>

                <section id="caracteristicas">
                    <div class="container">
                        <ul>
                            <li>✔️ 100% online</li>
                            <li>✔️ Flexibilidad de horarios</li>
                            <li>✔️ Soporte 1:1</li>
                            <li>✔️ Asistencia financiera</li>
                        </ul>
                    </div>
                </section>

                <section id="final">
                    <h2>Listo para programar?</h2>
                    <button className='buttonWelcome'>APLICÁ YA!</button>
                </section>

                <footer>
                    <div class="container">
                        <p>&copy; ProgramaYa 2021</p>
                    </div>
                </footer>
            </body>

    )

    return content
}

export default Welcome
