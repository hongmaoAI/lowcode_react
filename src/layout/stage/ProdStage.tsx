import React from 'react'
// type
import type { ComponentMap } from './index'
import type { Component } from '../../types/component'
// antd
import { Button, Space } from 'antd'
// useComponents
import { useComponents } from '../../app/hooks/useComponents'

const ComponentMap: ComponentMap = {
	Button: Button,
	Space: Space,
}

export default function ProdStage() {
	const { components } = useComponents()
	const renderComponents = (components: Component[]): React.ReactNode => {
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
	return <div>{renderComponents(components)}</div>
}
