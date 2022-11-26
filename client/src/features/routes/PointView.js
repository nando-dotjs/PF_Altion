import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectPointById } from '../points/pointsApiSlice'

const PointView = (props) => {

    const id = props.pointId

    const [pointState, setPointState] = React.useState(props.pointState)
    const [amountCollected, setAmountCollected] = React.useState(props.amountCollected)

    const point = useSelector(state => selectPointById(state, id))

    React.useEffect(() => {
        setPointState(props.pointState)
    }, [props.pointState])

    return (
        <tr className="tableRow">
            <td className="tableCell pointName">{point.name}</td>
            <td className="tableCell pointState">{pointState}</td>
            <td className="tableCell">
                {amountCollected}
            </td>
            <td className="tableCell">
                <button 
                    className="btn btn-primary"
                    onClick={() => props.handlePoint(point)} 
                >  
                    <FontAwesomeIcon icon={faEye} />
                </button>
            </td>
        </tr>
    )

}
export default PointView