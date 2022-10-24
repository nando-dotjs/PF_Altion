import React from 'react'
import "./MapPopup.css"
import MapContainer from "./MapContainer"

const MapPopup = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <MapContainer lat={props.lat} lng={props.lng}  />
                <button className="formSubmitButton"
                onClick={(e) => {
                        e.preventDefault()
                        props.setTrigger(false)}}>
                        Seleccionar punto
                </button>
                { props.children }
            </div>
        </div>
    ) : ""
}

export default MapPopup
