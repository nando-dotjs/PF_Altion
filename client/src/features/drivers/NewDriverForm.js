import { useState, useEffect } from "react"
import { useAddNewDriverMutation } from "./driversApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewDriverForm = () => {

    const [addNewDriver, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewDriverMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')

    const [surname, setSurname] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setSurname('')
            navigate('/dash/drivers')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)

    const canSave = [name, surname].every(Boolean) && !isLoading

    const onSaveDriverClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewDriver({ name, surname})
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveDriverClicked}>
                <div className="form__title-row">
                    <h2>Registro de Chofer</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="name">
                    Nombre: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="surname">
                    Apellido: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
                    id="surname"
                    name="surname"
                    type="text"
                    autoComplete="off"
                    value={surname}
                    onChange={onSurnameChanged}
                />

               

            </form>
        </>
    )

    return content
}
export default NewDriverForm