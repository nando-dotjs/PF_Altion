import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPencilSquare} from "@fortawesome/free-solid-svg-icons"
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectPointById } from '../points/pointsApiSlice'

const PointsList = (props) => {

    const id = props.pointId

    const [amount, setAmount] = React.useState(props.amount)

    const [pointState, setPointState] = React.useState(props.pointState)

    const point = useSelector(state => selectPointById(state, id))

    return (
        <tr className="tableRow">
            <td className="tableCell pointName">{point.name}</td>
            <td className="tableCell pointState">{pointState}</td>
            <td className="tableCell">
                <button 
                    className="btn btn-success btn-lg"
                    onClick={() => props.handlePoint(point)} 
                >  
                    <FontAwesomeIcon icon={faPencilSquare} />
                </button>
            </td>
        </tr>
    )

}
export default PointsList