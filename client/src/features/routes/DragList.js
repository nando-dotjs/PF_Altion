import './DragList.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [points]); 


	//const handle drag sorting
	const handleSort = () => {
		//Duplicar items
		let _points = [...points]

		//Quitar el item arrastrado y guardarlo
		const draggedItemContent = _points.splice(dragItem.current, 1)[0]

		//Cambiar la posición
		_points.splice(dragOverItem.current, 0, draggedItemContent)

		//Limpiar variables
		dragItem.current = null
		dragOverItem.current = null

		//Actualizar el array
		setPoints(_points)
	}

	return (
		<div className="app">
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
							<li><span>{index+1}</span>{`${item.name} - ${item.street} ${item.streetNumber}`}<button className={'deleteButton'} onClick={(e) => {e.preventDefault(); deletePoint(item)}}>
							<FontAwesomeIcon icon={faTimes}/>
						</button></li>
						
					</div>
				))}
			</div>
			<br/>
		</div>
	)
}
export default DragList