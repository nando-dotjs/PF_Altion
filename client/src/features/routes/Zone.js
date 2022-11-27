import { selectZoneById } from '../zones/zonesApiSlice'
import { useRef } from "react"
import { useSelector } from 'react-redux'

const Zone = ({ zoneId, selectedZones}) => {

    const ref = useRef(null);
    
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
                </td>
                <td className={`tableCell ${cellStatus}`}>{zone.name}</td>
                <td className={`tableCell ${cellStatus}`}>{zone.details}</td>
            </tr>
        )

    } else return ''
}
export default Zone