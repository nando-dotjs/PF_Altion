import React from 'react'
import './DragList.css'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"




const DragList = (props) => {
	
	const [points, setPoints] = React.useState(props.points)

	//save reference for dragItem and dragOverItem
	const dragItem = React.useRef()
	const dragOverItem = React.useRef()

	const deletePoint = (e) => {

		const newList = points.filter((item) => item !== e);

    	setPoints(newList);
		
	}

	React.useEffect( () => {
    setPoints(props.points);
	}, [props.points]); 

	React.useEffect( () => {
    	props.setSelectedPoints(points);
	}, [points]); 


	//const handle drag sorting
	const handleSort = () => {
		//duplicate items
		let _points = [...points]

		//remove and save the dragged item content
		const draggedItemContent = _points.splice(dragItem.current, 1)[0]

		//switch the position
		_points.splice(dragOverItem.current, 0, draggedItemContent)

		//reset the position ref
		dragItem.current = null
		dragOverItem.current = null

		//update the actual array
		setPoints(_points)
	}

	// //handle new item addition
	// const handleAddItem = () => {
	// 	const _fruitItems = [...fruitItems]
	// 	_fruitItems.push(newFruitItem)
	// 	setFruitItems(_fruitItems)
	// }

	return (
		<div className="app">

			{/** List container //TODO break into component */}
			<div className="list-container">
					<h3>Lista de puntos</h3>
				
				{points.map((item, index) => (
					<div className="list-item"
						key={item._id}
						draggable
						onDragStart={(e) => (dragItem.current = index)}
						onDragEnter={(e) => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}>
						<ul>
							<li><span>{index+1}</span>{`${item.name} - ${item.street} ${item.streetNumber}`}<span><button className={'deleteButton'} onClick={(e) => {e.preventDefault(); deletePoint(item)}}>
							<FontAwesomeIcon icon={faTimes}/>
						</button></span></li>
						</ul>
						{/* <div className="index">{index+1}</div> */}
						{/* <div className="name">{`${item.name} - ${item.street} ${item.streetNumber}`}</div> */}
						
					</div>
				))}
			</div>
			<br/>
		</div>
	)
}
export default DragList