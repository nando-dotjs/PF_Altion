import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import './Login.css';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
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

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('El usuario y/o contraseña es incorrecto');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Cargando...</p>

    const content = (
        <div className="account-wall" align="center">
            <img id="profile-img" src={require('../../img/logoUC.PNG')} />
        <Container fluid>
            <Form>
                    <Row className="justify-content-md-center">
                    <Col>
                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    </Col>
                    <Form className="form-signin">
                        <Col md="auto">
                        {/* <label htmlFor="username">Usuario:</label> */}
                        </Col>
                        <Col>
                        <input className="form-control" placeholder="Usuario" type="text" id="username" ref={userRef} value={username} onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />
                        <br/>
                        </Col>
                        <Col>
                        {/* <label htmlFor="password">Contraseña:</label> */}
                        </Col>
                        <Col>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                        </Col>
                        <Col>
                        <Button className="formSubmitButton" onClick={handleSubmit}>Ingresar</Button>
                        </Col>
                        <br/>
                        <label htmlFor="registerLbl">¿No tiene cuenta? </label> 
                    <Link to="/register">Cree una</Link>
                    </Form >
                    <Col>
                   
                    </Col>
                </Row>
                <footer>
                ¡Da vida al planeta: RECICLA!       
                </footer>
                </Form>
            </Container>
            </div>
            
    )

    return content
}
export default Login