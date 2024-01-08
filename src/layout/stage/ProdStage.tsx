import React, { useRef } from 'react'
// type
import type { ComponentMap } from './index'
import type { Component } from '../../types/component'
// antd
import {  Space, message } from 'antd'
// useComponents
import { useComponents } from '../../app/hooks/useComponents'
// componentEventMap
import { componentEventMap } from '../setting/Event'
// component
import Button from '../../common/Button'

const ComponentMap: ComponentMap = {
	Button: Button,
	Space: Space,
}

export default function ProdStage() {
	const { components } = useComponents()
	const componentRefs = useRef<any>({})
	// 处理事件
	const handleEvent = (component: Component) => {
		const props: any = {}
		if (componentEventMap[component.name]?.length) {
			componentEventMap[component.name].forEach((event) => {
				const eventConfig = component.props[event.name]
				if (eventConfig) {
					const { type, config } = eventConfig
					props[event.name] = () => {
						if (type === 'showMessage') {
							if (config.type === 'success') {
								message.success(config.text)
							} else if (config.type === 'error') {
								message.error(config.text)
							}
						} else if (type === 'componentFunction') {
							const component = componentRefs.current[config.componentId]
							if (component) {
								component[config.method]?.()
							}
						}
					}
				}
			})
		}
		return props
	}
	const renderComponents = (components: Component[]): React.ReactNode => {
		return components.map((component: Component) => {
			if (!ComponentMap[component.name]) {
				return null
			}
			const props = handleEvent(component)
			if (ComponentMap[component.name]) {
				return React.createElement(
					ComponentMap[component.name],
					{
						key: component.id,
						id: component.id,
						ref: (ref: any) => {
							componentRefs.current[component.id] = ref
						},
						...component.props,
						...props,
					},

					component.props.children || renderComponents(component.children || [])
				)
			}
			return null
		})
	}
	return <div>{renderComponents(components)}</div>
}
