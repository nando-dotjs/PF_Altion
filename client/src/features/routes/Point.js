import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSave} from "@fortawesome/free-solid-svg-icons"
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectPointById } from '../points/pointsApiSlice'

const PointsList = (props) => {

    const id = props.pointId

    const [amount, setAmount] = React.useState(props.amount)

    const point = useSelector(state => selectPointById(state, id))

	return (
            <tr>
			<td>
                {point.name}
			</td>
            <td>
                <input type="number" name="myInput" value={amount} onChange={e => setAmount(e.target.value)}/>
            </td>
            <td className={`tableCell`}>
                <button
                    className="icon-button tableButton" onClick={() => props.handlePoint(point, amount)}
                >
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </td>
            </tr>
	)
}
export default PointsList