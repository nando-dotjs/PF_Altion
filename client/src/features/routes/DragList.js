import React from 'react'
import './DragList.css'
import { Button } from 'react-bootstrap'





const DragList = (props) => {
	
	const [points, setPoints] = React.useState(props.points)

	//save reference for dragItem and dragOverItem
	const dragItem = React.useRef()
	const dragOverItem = React.useRef()

	const deletePoint = (e) => {
		const newList = points.filter((item) => item !== e);

    	setPoints(newList);
		
	}

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

		console.log(_points)
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
				{points.map((item, index) => (
					<div
						key={index}
						className="list-item"
						draggable
						onDragStart={(e) => (dragItem.current = index)}
						onDragEnter={(e) => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}>
						<i className="fa-solid fa-bars"></i>
						<h3>{item.name}</h3>
						<button className={'btn btn-danger'} onClick={() => deletePoint(item)}>
							X
						</button>
					</div>
				))}
			</div>
			<button className={'btn btn-success'} onClick={e => props.setSelectedPoints(points)}>
			Seleccionar Puntos
			</button>
		</div>
	)
}
export default DragList