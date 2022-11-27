import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Form, Container, Button, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import './Login.css';


const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [persist] = useState(JSON.parse(localStorage.getItem("persist")));

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        localStorage.setItem("persist", true)
    }, [persist])

    useEffect(() => {
        userRef.current.focus()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ mail, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setMail('')
            setPassword('')
            Swal.fire({ //Ventana de login exitoso con Lib Sweetalert2
                position: 'center',
                icon: 'success',
                title: 'Logueado con éxito al sistema',
                showConfirmButton: false,
                timer: 1500
              })
            
            navigate('/dash')
          
        } catch (err) {
            if (!err.status) {
                Swal.fire('No Server Response')
            } else if (err.status === 400) {
                Swal.fire({
                    icon:"warning",
                    text:'Debe ingresar Correo y Contraseña'})
            } else if (err.status === 401) {
               
                Swal.fire({ //Ventana de error datos incorrectos Lib Sweetalert2
                    title:"Error",
                    text:'El usuario y/o contraseña es incorrecto',
                    icon:"error",
                    button: "Aceptar"
                })
            } else {
                Swal.fire(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setMail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    if (isLoading) return <div className="loader"></div>
        
    

    const content = (
        <div className="account-wall" align="center">
            <img id="profile-img" src={require('../../img/logoUC.PNG')} alt={"UPC"} />
            <Container fluid>
                <Row className="justify-content-md-center">
                    {/* Modificacion de form para manejar el submit usando la tecla enter */}
                    <Form className="form-signin" onSubmit={handleSubmit}>
                        <Col>
                            <input className="form-control" 
                                placeholder="Correo electrónico" 
                                type="text" id="mail" 
                                ref={userRef} value={mail} onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />
                            <br/>
                        </Col>
                        <Col>
                            <input
                                className="form-control"
                                placeholder="Contraseña"
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                        </Col>
                        <Col>
                            {/* Modificación de botón para manejar el submit con enter */}
                            <Button type="submit" className="formSubmitButton" onClick={handleSubmit}>Ingresar</Button> 
                        </Col>
                            <br/>
                            <label htmlFor="registerLbl">¿No tienes una cuenta? </label> 
                            <br/>
                            
                        <Link to="/register">Regístrate</Link>
                    </Form >
                </Row>
            </Container>
        </div>
            
    )

    return content
}
export default Login