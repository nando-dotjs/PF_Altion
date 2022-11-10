import React from 'react'
import './DragList.css'




const DragList = (props) => {
	
	const [points, setPoints] = React.useState(props.points)

	const [fruitItems, setFruitItems] = React.useState([
		"Apple",
		"Banana",
		"Orange",
	])
	const [newFruitItem, setNewFruitItem] = React.useState("")

	//save reference for dragItem and dragOverItem
	const dragItem = React.useRef()
	const dragOverItem = React.useRef()

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

	//handle name change
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewFruitItem(e.target.value)
	}

	// //handle new item addition
	// const handleAddItem = () => {
	// 	const _fruitItems = [...fruitItems]
	// 	_fruitItems.push(newFruitItem)
	// 	setFruitItems(_fruitItems)
	// }

	return (
		<div className="app">
			<h2>Fruit List</h2>

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
					</div>
				))}
			</div>
		</div>
	)
}
export default DragList