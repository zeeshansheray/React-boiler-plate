import React from 'react';

export default function DraggableComponent({list, ItemComponent, setList}) {

	const onDragStart = (event, fromIndex) => event.dataTransfer.setData("fromIndex", fromIndex);
    const onDragOver  = (event) => event.preventDefault();

	const dragEnter = (event, idx) => {
		const element = document.getElementById(idx)
		element.classList.add('over')
	}
	   
	const dragLeave = (event, idx) => {
		event.stopPropagation();
		const element = document.getElementById(idx)
		element.classList.remove('over');
	}

	const dragEnd = (event) => {
		var listItens = document.querySelectorAll('.draggable');
		[].forEach.call(listItens, function(item) {
		  item.classList.remove('over');
		});
		event.target.style.opacity = '1';
	}

	const onDrop = (event, toIndex) => {
	    let fromIndex = event.dataTransfer.getData("fromIndex");
		let element = list.splice(fromIndex, 1)
		list.splice(toIndex, 0, element[0])

	    setList([...list]);
	}

	return (
		<div className="drag-container">
			{list.map((item, idx)=>(
				<div 
					draggable
					key         = {idx}
					id          = {idx}
					onDragStart = {(event) => onDragStart(event, idx)}
					className   = "draggable"
					onDragOver  = {(event)=>onDragOver(event)}
					onDrop      = {(event)=>onDrop(event, idx)}
					onDragEnter = {(event)=>dragEnter(event, idx)}
					onDragLeave = {(event)=>dragLeave(event, idx)}
					onDragEnd   = {dragEnd}
				>
					{ItemComponent({item, idx})}
				</div>
			))}
		</div>
	)
}

