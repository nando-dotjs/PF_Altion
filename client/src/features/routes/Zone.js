import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import {Check} from 'react-bootstrap'
import { useRef, useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { selectZoneById } from '../zones/zonesApiSlice'

const Zone = ({ zoneId, selectedZones}) => {

    const ref = useRef(null);

    useEffect(() => {
    const el2 = ref.current;
    }, []);
    
    const zone = useSelector(state => selectZoneById(state, zoneId))

    if (zone) {

        const handleCheck = () => {
            selectedZones(zone)
        }

        const cellStatus = zone.active ? '' : 'tableCell--inactive'


        return (
            <tr className="tableRow zone">
                <td className={`tableCell ${cellStatus}`}>
                    <input type="checkbox"  onChange={handleCheck} ref={ref} />
                {/* <button
                        className="btn btn-primary"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button> */}
                </td>
                <td className={`tableCell ${cellStatus}`}>{zone.name}</td>
                <td className={`tableCell ${cellStatus}`}>{zone.details}</td>

            </tr>
        )

    } else return null
}
export default Zone