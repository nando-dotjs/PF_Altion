import { useState, useEffect } from "react"
import { useUpdateDriverMutation, useDeleteDriverMutation } from "./driversApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditDriverForm = ({ driver }) => {

    const [updateDriver, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateDriverMutation()

    const [deleteDriver, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteDriverMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(driver.name)
    const [surname, setSurname] = useState(driver.surname)
    const [active, setActive] = useState(driver.active)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setName('')
            setSurname('')
            navigate('/dash/drivers')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveDriverClicked = async (e) => {
        await updateDriver({ id: driver.id, name, surname, active })
    }

    const onDeleteDriverClicked = async () => {
        await deleteDriver({ id: driver.id })
    }

    let canSave = [name, surname].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <main className='editDriver'>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="formTitleRow">
                        <h2>Edit Driver</h2>
                        <div className="formActionButtons">
                            <button
                                className="iconButton"
                                title="Save"
                                onClick={onSaveDriverClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteDriverClicked}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    </div>
                    <label className="formLabel" htmlFor="name">
                        Nombre: <span className="nowrap"></span></label>
                    <input
                        className={`formInput name`}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <label className="formLabel" htmlFor="surname">
                        Apellido: <span className="nowrap"></span> <span className="nowrap"></span></label>
                    <input
                        className={`formInput surname`}
                        id="surname"
                        name="surname"
                        type="text"
                        autoComplete="off"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />

                    <label className="formLabel formCheckboxContainer" htmlFor="driver-active">
                        ACTIVO:
                        <input
                            className="formCheckbox"
                            id="driver-active"
                            name="driver-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>

                </form>
            </main>
        </>
    )

    return content
}
export default EditDriverForm