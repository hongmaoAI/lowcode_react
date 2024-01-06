import React from 'react'
// antd
import { Button, Space } from 'antd'
// react-dnd
import { useDrop } from 'react-dnd'
// item-type
import { ItemType } from '../../item-type'

interface Component {
	id: number
	name: string
	props: any
	children?: Component[]
}

interface ComponentMap {
	[key: string]: React.ComponentType<any>
}

const components: Component[] = []

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
				{ key: component.id, id: component.id, ...component.props },
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
	return (
		<div
			className="p-[24px] h-[100%]"
			ref={drop}
			style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
		>
			{renderComponents(components)}
		</div>
	)
}
