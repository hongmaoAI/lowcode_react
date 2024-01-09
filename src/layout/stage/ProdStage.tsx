import React, { useRef } from 'react'
// type
import type { ComponentMap } from './index'
import type { Component } from '../../types/component'
// antd
import { Space, message } from 'antd'
// useComponents
import { useComponents } from '../../app/hooks/useComponents'
// use
import { useVariables } from '../../app/hooks/useVariables'
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
	const { variables } = useVariables()
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
	// 处理组件props
	const formatProps = (component: Component) => {
		const props = Object.keys(component.props || {}).reduce<any>(
			(prev, cur) => {
				// 组件属性是否时对象，是对象的话判断时静态值还是变量
				if (typeof component.props[cur] === 'object') {
					// 值为静态值时，则直接赋值。如果是变量，则取变量中的默认值
					if (component.props[cur]?.type === 'static') {
						prev[cur] = component.props[cur].value
					} else if (component.props[cur]?.type === 'variable') {
						const variableName = component.props[cur].value
						const variable = variables.find(
							(item) => item.name === variableName
						)
						prev[cur] = variable?.defaultValue
					}
				} else {
					prev[cur] = component.props[cur]
				}
				return prev
			},
			{}
		)
		return props
	}
	// 渲染组件
	const renderComponents = (components: Component[]): React.ReactNode => {
		return components.map((component: Component) => {
			if (!ComponentMap[component.name]) {
				return null
			}
			let props = formatProps(component)
			props = { ...handleEvent(component), ...props }
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
