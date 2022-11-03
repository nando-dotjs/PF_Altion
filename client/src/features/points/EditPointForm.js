// import { useRef, useState, useEffect } from "react"
// import { useUpdatePointMutation} from "./pointsApiSlice"
// import { useNavigate } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
// import MapContainer from '../maps/MapContainer'
// import useAuth from '../../hooks/useAuth'

// // eslint-disable-next-line
// const ID_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{5,20}$/;
// // eslint-disable-next-line
// const PHONENUMBER_REGEX = /^\d{9}$/;
// // eslint-disable-next-line
// const DETAILS_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{10,50}$/;
// // eslint-disable-next-line
// const STREET_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,20}$/;
// const STREET_NUMBER_REGEX = /^[0-9]+$/;


// const EditPointForm = ({ point, users }) => {

//     const {username, isAdmin, isCEV, isEmpresa} = useAuth()

//     const [updatePoint, {
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useUpdatePointMutation()

//     // const [deleteCev, {
//     //     isSuccess: isDelSuccess,
//     //     isError: isDelError,
//     //     error: delerror
//     // }] = useDeleteCevMutation()

//     const navigate = useNavigate()

//     const userRef = useRef();
//     // eslint-disable-next-line
//     const [errMsg, setErrMsg] = useState('');

//     const [phoneNumber, setPhoneNumber] = useState(point.phoneNumber)
//     const [validPhoneNumber, setValidPhoneNumber] = useState(false)
//     const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

//     const [details, setDetails] = useState(point.details)
//     const [validDetails, setValidDetails] = useState(false)
//     const [detailsFocus, setDetailsFocus] = useState(false);

//     const [street, setStreet] = useState(point.street)
//     const [validStreet, setValidStreet] = useState(false)
//     const [streetFocus, setStreetFocus] = useState(false);

//     const [streetNumber, setStreetNumber] = useState(point.streetNumber)
//     const [validStreetNumber, setValidStreetNumber] = useState(false)
//     const [streetNumberFocus, setStreetNumberFocus] = useState(false);

//     const [completed, setCompleted] = useState(point.completed)
//     const [userId, setUserId] = useState(point.user)

//     const [lat, setLat] = useState(+point.lat)
//     const [validLatitude, setValidLatitude] = useState(false)
//     const [latitudeNumberFocus, setLatitudeNumberFocus] = useState(false);
    
//     const [lng, setLng] = useState(+point.long)
//     const [validLongitude, setValidLongitude] = useState(false)
//     const [longitudeNumberFocus, setLongitudeNumberFocus] = useState(false);


//     useEffect(() => {
//         userRef?.current?.focus();
//     }, [])

//     const [values, setValues] = useState([])
//     const [optionsZone, setOptions] = useState()
//     useEffect(() => {
//         fetch("http://localhost:5000/zones")
//         .then((data) => data.json()).then((val) => setValues(val))
//     }, []);

//     const optionsToChoose = values.map((options,i)=><option key={i}>{options.active ? options.name : 'No asignar'}</option>)

//     useEffect(() => {
//         setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber));
//     }, [phoneNumber])

//     useEffect(() => {
//         setValidDetails(DETAILS_REGEX.test(details));
//     }, [details])

//     useEffect(() => {
//         setValidStreet(STREET_REGEX.test(street));
//     }, [street])

//     useEffect(() => {
//         setValidStreetNumber(STREET_NUMBER_REGEX.test(streetNumber));
//     }, [streetNumber])

//     useEffect(() => {
//         setErrMsg('');
//     }, [idFamily, phoneNumber, details, street, streetNumber, lat, lng])

//     useEffect(() => {

//         // if (isSuccess || isDelSuccess) {
//         //     setIdFamily('')
//         //     setPhoneNumber('')
//         //     setDetails('')
//         //     setStreet('')
//         //     setStreetNumber('')
//         //     setUserId('')
//         //     navigate('/dash/cevs')
//         // }
//         if (isSuccess) {
//             setPhoneNumber('')
//             setDetails('')
//             setStreet('')
//             setStreetNumber('')
//             setUserId('')
//             setOptions('')
//             navigate('/dash/cevs')
//         }
//     //    [isSuccess, isDelSuccess, navigate]
//     }, [isSuccess, navigate])

//     const onIdFamilyChanged = e => setIdFamily(e.target.value)
//     const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
//     const onDetailsChanged = e => setDetails(e.target.value)
//     const onStreetChanged = e => setStreet(e.target.value)
//     const onStreetNumberChanged = e => setStreetNumber(e.target.value)

//     const onCompletedChanged = e => setCompleted(prev => !prev)
//     const onUserIdChanged = e => setUserId(e.target.value)

//     const onZoneNameChanged = e => setOptions(e.target.value)

//     const canSave = [validPhoneNumber, validDetails, validStreet, validStreetNumber, userId, optionsZone].every(Boolean) && !isLoading

//     const onSavePointClicked = async (e) => {
//         if (canSave) {
//             await updatePoint({ id: cev.id, user: userId, details, phoneNumber, street, streetNumber, completed, zone: optionsZone })
//         }
//     }

//     // const onDeleteCevClicked = async () => {
//     //     await deleteCev({ id: cev.id })
//     // }

//     const created = new Date(point.createdAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
//     const updated = new Date(point.updatedAt).toLocaleString('es-UY', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

//     const latlng = {"lat": lat, "lng": lng}

//     const options = users.map(user => {
//         return (
//             <option
//                 key={user.id}
//                 value={user.id}

//             > {user.username}</option >
//         )
//     })

//     const errClass = (isError) ? "errmsg" : "offscreen"
//     // const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

//     // const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

//     const errContent = (error?.data?.message) ?? ''

//     // let deleteButton = null
//     let selector = null 
//     let selectorZone = null
//     let input = null
//     let label = null
//     let check = null
//     let map = null
//     if (isAdmin) {
//         // deleteButton = (
//         //     <button
//         //         className="icon-button"
//         //         title="Delete"
//         //         onClick={onDeleteCevClicked}
//         //     >
//         //         <FontAwesomeIcon icon={faTrashCan} />
//         //     </button>
//         // )
//         map = (
//             <MapContainer isDraggable={false} latlng={latlng}/>
//         )

//         selector = (



//             <select
//                             id="cev-username"
//                             name="username"
//                             className="formSelect"
//                             value={userId}
//                             onChange={onUserIdChanged}
//                         >
//                             {options}
//                         </select>
//         )

//         selectorZone = (
//                                     // onChange={(e)=>setOptions(e.target.value)}
//                             <select 
//                             id="cev-zone"
//                             name="cev-zone"
//                             className="formSelect"
//                             value={optionsZone}
//                             onChange={onZoneNameChanged}
//                             >
//                             <option selected="true" disabled="disabled" value=""> -- Elige zona -- </option>    
//                             {    
//                                 optionsToChoose
//                             }
//                             </select>
//         )
//         label = (
//                 <label>Registro completado:</label>
//                 )
//         check = (
                        
//                             <input
//                                 className="formCheckbox"
//                                 id="cev-completed"
//                                 name="completed"
//                                 type="checkbox"
//                                 checked={completed}
//                                 onChange={onCompletedChanged}
//                             />
//         )
//     } else if (isCEV || isEmpresa) {
//         input = <input readOnly
//                 className={`formInput`}
//                 id="idUser"
//                 name="idUser"
//                 type="text"
//                 autoComplete="off"
//                 value={username}
//             />
//     }

//     const content = (
//         <>
//             <p className={errClass}>{errContent}</p>

//             <form className="form" onSubmit={e => e.preventDefault()}>
//                 <div className="formTitleRow">
//                     <h2>Editar CEV</h2>
//                     <div className="formActionButtons">
//                         {/* <button
//                             className="icon-button"
//                             title="Save"
//                             onClick={onSaveCevClicked}
//                             disabled={!canSave}
//                         >
//                             <FontAwesomeIcon icon={faSave} />
//                         </button> */}
//                         {/* {deleteButton} */}
//                     </div>
//                 </div>
//                 <label htmlFor="id">
//                     Nombre:
//                     <FontAwesomeIcon icon={faCheck} className={validId ? "valid" : "hide"} />
//                     <FontAwesomeIcon icon={faTimes} className={validId || !idFamily ? "hide" : "invalid"} />
//                 </label>
//                 <input
//                     className={`formInput `}
//                     id="id"
//                     name="id"
//                     type="text"
//                     autoComplete="off"
//                     value={idFamily}
//                     onChange={onIdFamilyChanged}
//                     required
//                     aria-invalid={validId ? "false" : "true"}
//                     aria-describedby="uidcev"
//                     onFocus={() => setIDFocus(true)}
//                     onBlur={() => setIDFocus(false)}
//                 />
//                 <p id="uidcev" className={IdFocus && idFamily && !validId? "instructions" : "offscreen"}>
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                     5 a 20 caracteres.<br />
//                     Debe empezar y contener solo letras.<br />
//                 </p>
//                 <label htmlFor="phoneNumber">
//                 Teléfono/PhoneNumberular:
//                 <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
//                     <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
//                 </label>
//                 <textarea
//                     className={`formInput `}
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={phoneNumber}
//                     onChange={onPhoneNumberChanged}
//                     required
//                     aria-invalid={validPhoneNumber ? "false" : "true"}
//                     aria-describedby="uidcev"
//                     onFocus={() => setPhoneNumberFocus(true)}
//                     onBlur={() => setPhoneNumberFocus(false)}
//                 />
//                 <p id="uidcev" className={phoneNumberFocus && phoneNumber && !validPhoneNumber? "instructions" : "offscreen"}>
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                     0 a 9 números.<br />
//                     No puedo contener otro tipo de carácteres.<br />
//                 </p>

//                 <label htmlFor="details">
//                     Detalles:
//                     <FontAwesomeIcon icon={faCheck} className={validDetails ? "valid" : "hide"} />
//                     <FontAwesomeIcon icon={faTimes} className={validDetails || !details ? "hide" : "invalid"} />
//                 </label>
//                 <textarea
//                     className={`formInput `}
//                     id="details"
//                     name="details"
//                     value={details}
//                     onChange={onDetailsChanged}
//                     required
//                     aria-invalid={validDetails ? "false" : "true"}
//                     aria-describedby="uidcev"
//                     onFocus={() => setDetailsFocus(true)}
//                     onBlur={() => setDetailsFocus(false)}
//                 />
//                 <p id="uidcev" className={detailsFocus && details && !validDetails? "instructions" : "offscreen"}>
//                 <FontAwesomeIcon icon={faInfoCircle} />
//                 10 a 50 caracteres.<br />
//                 Debe empezar y contener solo letras.<br />
//                 </p>

//                 <label htmlFor="street">
//                     Calle:
//                     <FontAwesomeIcon icon={faCheck} className={validStreet ? "valid" : "hide"} />
//                     <FontAwesomeIcon icon={faTimes} className={validStreet || !street ? "hide" : "invalid"} />
//                     </label>
//                 <textarea
//                     className={`formInput`}
//                     id="street"
//                     name="street"
//                     value={street}
//                     onChange={onStreetChanged}
//                     required
//                     aria-invalid={validStreet ? "false" : "true"}
//                     aria-describedby="uidcev"
//                     onFocus={() => setStreetFocus(true)}
//                     onBlur={() => setStreetFocus(false)}
//                 />
//                 <p id="uidcev" className={streetFocus && street && !validStreet? "instructions" : "offscreen"}>
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                     3 a 20 caracteres.<br />
//                     Debe empezar y contener solo letras.<br />
//                 </p>

//                 <label htmlFor="number">
//                     Número:
//                     <FontAwesomeIcon icon={faCheck} className={validStreetNumber ? "valid" : "hide"} />
//                     <FontAwesomeIcon icon={faTimes} className={validStreetNumber || !streetNumber ? "hide" : "invalid"} />
//                 </label>
//                 <textarea
//                     className={`formInput`}
//                     id="text"
//                     name="text"
//                     value={streetNumber}
//                     onChange={onStreetNumberChanged}
//                     required
//                     aria-invalid={validStreetNumber ? "false" : "true"}
//                     aria-describedby="uidcev"
//                     onFocus={() => setStreetNumberFocus(true)}
//                     onBlur={() => setStreetNumberFocus(false)}
//                 />
//                 <p id="uidcev" className={streetNumberFocus && streetNumber && !validStreetNumber? "instructions" : "offscreen"}>
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                     Solo números.<br />
//                     No puedo contener otro tipo de carácteres.<br />
//                 </p>

//                 {map}

//                 <div className="formRow">
                    
//                     <div className="formDivider">
//                         <label className="formLabel formCheckboxContainer" htmlFor="cev-completed">
//                             {label}
//                             {check}
//                         </label>

//                         <label className="formLabel formCheckboxContainer" htmlFor="cev-username">
//                             Propietario:</label>
//                             {selector}
//                             {input}

//                         <label className="formLabel formCheckboxContainer" htmlFor="cev-username">
//                             Zona:</label>
//                             {selectorZone}
//                     </div>
//                     <div className="formDivider">
//                         <p className="formCreated">Creado:<br />{created}</p>
//                         <p className="formUpdated">Actualizado:<br />{updated}</p>
//                     </div>
//                 </div>

//                 <br></br>
//                 <button className="formSubmitButton" onClick={onSavePointClicked} disabled={!validId || !validPhoneNumber || !validDetails || !validStreet || !validStreetNumber || !optionsZone ? true : false}>Guardar cambios</button>

//             </form>
//         </>
//     )

//     return content
// }

// export default EditPointForm
