import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

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
        <section className="public">
            <header>
                <h1>Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        className="formInput"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Contraseña:</label>
                    <input
                        className="formInput"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="formSubmitButton">Ingresar</button>
                </form>
                <label htmlFor="registerLbl">¿No tiene cuenta? </label> 
                <Link to="/register">Cree una</Link>
            </main>
            <footer>
                <Link className="registerLink" to="/">Volver a Inicio</Link>
            </footer>
        </section>
    )

    return content
}
export default Login