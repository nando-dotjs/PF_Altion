import React from 'react'
import '../users/register.css'
import './index.css'
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
                            <p>Somos una cooperativa social del departamento de Paysandú, formada el 2 de mayo del 2013, hoy conformada por 9 integrantes. </p>
                        </div>
                    </div>
                </section>

                <section id="nuestros-programas">
                    <div className="container">
                        <h2>Nuestro trayecto</h2>
                        <div className="programas">
                            <div className="carta">
                                <h3>2013</h3><br></br><br></br>
                                {/* <p>En un principio la recolección se realizaba a carro, en un circuito establecido por nosotros. La materia prima se vendía a granel.</p> */}
                                <button className='buttonWelcome'>En un principio la recolección se realizaba a carro, en un circuito establecido por nosotros. La materia prima se vendía a granel.</button>
                            </div>
                            <div className="carta">
                                <h3>2014</h3><br></br><br></br>
                                {/* <p>Comenzamos a procesar y enfardar materia prima, vendiendo fardos de cartón y plástico (PET).</p> */}
                                <button className='buttonWelcome'>Comenzamos a procesar y enfardar materia prima, vendiendo fardos de cartón y plástico (PET).</button>
                            </div>
                            
                            <div className="carta">
                                <h3>2018</h3><br></br><br></br>
                                {/* <p>Comenzamos a realizar la recolección de residuos reciclabes, como un servicio que le prestabamos a la intendencia de Paysandú, conocido como circuito limpio.</p> */}
                                <button className='buttonWelcome'>Comenzamos a realizar la recolección de residuos reciclabes, como un servicio que le prestabamos a la intendencia de Paysandú, conocido como circuito limpio.</button>
                            </div>  
                        </div>
                    </div>
                </section>


                <section id="caracteristicas">
                <h2>Con nuestra aplicación podrás...</h2>
                    <div className="container">
                        <ul>
                            <li>✔️ Ponerte en contacto con la cooperativa.</li>
                            <li>✔️ Registrar un punto de recolección.</li>
                            <li>✔️ Editar la información del punto de recolección.</li>
                        </ul>
                    </div>
                </section>


                <section id="final">
                    <h2>¿Necesitas ayuda?</h2>
                        <div className='videoContainer'>
                            <iframe className="video" width="600" height="450" src="https://www.youtube-nocookie.com/embed/vtgl7p5hHvw?start=41" 
                            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                            gyroscope; picture-in-picture" allowFullScreen="">
                            </iframe>
                        </div>
                        <h6>Por más información, contáctanos a cooperativaunidos@gmail.com</h6>
                </section>
                <footer>
                    <div className="container">
                        <p>&copy; Altion 2022</p>
                    </div>
                </footer>
                
            </body>

    )

    return content
}

export default Welcome
