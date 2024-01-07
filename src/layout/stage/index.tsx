import React, { useEffect, useRef } from 'react'
// antd
import { Button } from 'antd'
// components
import Space from '../../components/Space'
import SelectedMask from '../../common/selected-mask'
// react-dnd
import { useDrop } from 'react-dnd'
// item-type
import { ItemType } from '../../item-type'
// componentType
import type { Component } from '../../types/component'
// app -> hooks
import { useComponents } from '../../app/hooks/useComponents'

interface ComponentMap {
	[key: string]: React.ComponentType<any>
}

const ComponentMap: ComponentMap = {
	Button: Button,
	Space: Space,
}

function renderComponents(components: Component[]): React.ReactNode {
	return components.map((component: Component) => {
		if (!ComponentMap[component.name]) {
			return null
		}
		if (ComponentMap[component.name]) {
			return React.createElement(
				ComponentMap[component.name],
				{
					key: component.id,
					id: component.id,
					'data-component-id': component.id,
					...component.props,
				},
				component.props.children || renderComponents(component.children || [])
			)
		}
		return null
	})
}

export default function Stage() {
	const [{ canDrop }, drop] = useDrop(() => ({
		accept: [ItemType.Space, ItemType.Button],
		drop: (_, monitor) => {
			const didDrop = monitor.didDrop()
			if (didDrop) {
				return
			}
			return { id: 0 }
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
		}),
	}))
	const { components, curComponentId, setCurComponentId } = useComponents()
	const selectedMaskRef = useRef<any>(null)
	useEffect(() => {
		function createMask(e: any) {
			const path = e.composedPath()
			for (let i = 0; i < path.length; i++) {
				const ele = path[i]
				if (ele.getAttribute && ele.getAttribute('data-component-id')) {
					const componentId = ele.getAttribute('data-component-id')
					setCurComponentId(componentId)
					return
				}
			}
		}
		let container = document.querySelector('.stage')
		if (container) {
			container.addEventListener('click', createMask, true)
		}
		return () => {
			container = document.querySelector('.stage')
			if (container) {
				container.removeEventListener('click', createMask, true)
			}
		}
	}, [])
	useEffect(() => {
		if (selectedMaskRef?.current) {
			selectedMaskRef.current.updatePosition()
		}
	}, [components])
	console.log(curComponentId)
	return (
		<div
			className="p-[24px] h-[100%] stage"
			ref={drop}
			style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
		>
			{renderComponents(components)}
			{curComponentId && (
				<SelectedMask
					componentId={curComponentId}
					containerClassName="select-mask-container"
					offsetContainerClassName="stage"
					ref={selectedMaskRef}
				/>
			)}
			<div className="select-mask-container"></div>
		</div>
	)
}
