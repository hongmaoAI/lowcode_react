import React, { useState } from 'react'
// ItemType
import { ItemType } from '../../item-type'
// hooks -> useComponent
import { useComponents } from '../../app/hooks/useComponents'
// antd
import { Collapse, Input, Select, TreeSelect } from 'antd'
// type
import type { Component } from '../../types/component'
// getComponentById
import { getComponentById } from '../../app/hooks/useComponents'

export const componentEventMap = {
	[ItemType.Button]: [
		{
			name: 'onClick',
			label: '点击事件',
		},
	],
}

const componentMethodMap = {
	[ItemType.Button]: [
		{
			name: 'startLoading',
			label: '开始loading',
		},
		{
			name: 'endLoading',
			label: '结束loading',
		},
	],
}

const Event = () => {
	const { curComponent, curComponentId, updateComponentProps, components } =
		useComponents()
	const [selectedComponent, setSelectedComponent] = useState<Component | null>()
	const typeChange = (eventName: string, value: string) => {
		if (!curComponentId) return
		updateComponentProps(curComponentId, { [eventName]: { type: value } })
	}
	// 变化类型
	const messageTypeChange = (eventName: string, value: string) => {
		if (!curComponentId) return
		setSelectedComponent(null)
		updateComponentProps(curComponentId, {
			[eventName]: {
				...curComponent?.props?.[eventName],
				config: {
					...curComponent?.props?.[eventName]?.config,
					type: value,
				},
			},
		})
	}
	// 文本变化
	const messageTextChange = (eventName: string, value: string) => {
		if (!curComponentId) return
		updateComponentProps(curComponentId, {
			[eventName]: {
				...curComponent?.props?.[eventName],
				config: {
					...curComponent?.props?.[eventName]?.config,
					text: value,
				},
			},
		})
	}

	const componentChange = (eventName: string, value: string) => {
		if (!curComponentId) return
		setSelectedComponent(getComponentById(value, components))
		updateComponentProps(curComponentId, {
			[eventName]: {
				...curComponent?.props?.[eventName],
				config: {
					...curComponent?.props?.[eventName]?.config,
					componentId: value,
				},
			},
		})
	}

	const componentMethodChange = (eventName: string, value: string) => {
		if (!curComponentId) return
		updateComponentProps(curComponentId, {
			[eventName]: {
				...curComponent?.props?.[eventName],
				config: {
					...curComponent?.props?.[eventName]?.config,
					method: value,
				},
			},
		})
	}

	if (!curComponent) return null
	return (
		<div className="px-[12px]">
			{(componentEventMap[curComponent.name] || []).map((component) => {
				return (
					<Collapse key={component.label} defaultActiveKey={component.name}>
						<Collapse.Panel header={component.name} key={component.name}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
								<div>动作： </div>
								<div>
									<Select
										style={{ width: 160 }}
										options={[
											{ label: '显示提示', value: 'showMessage' },
											{ label: '组件方法', value: 'componentFunction' },
										]}
										value={curComponent?.props?.[component.name]?.type}
										onChange={(value) => typeChange(component.name, value)}
									/>
								</div>
							</div>
							{curComponent?.props?.[component.name]?.type ===
								'showMessage' && (
								<div className="mt-[12px] flex flex-col gap-[12px]">
									<div
										style={{ display: 'flex', alignItems: 'center', gap: 10 }}
									>
										<div>类型: </div>
										<div>
											<Select
												className="w-[160px]"
												options={[
													{ label: '成功', value: 'success' },
													{ label: '失败', value: 'error' },
												]}
												onChange={(value) => {
													messageTypeChange(component.name, value)
												}}
												value={
													curComponent?.props?.[component.name]?.config?.type
												}
											/>
										</div>
									</div>
									<div
										style={{ display: 'flex', alignItems: 'center', gap: 10 }}
									>
										<div>文本: </div>
										<div>
											<Input
												className="w-[160px]"
												onChange={(e) => {
													messageTextChange(component.name, e.target.value)
												}}
												value={
													curComponent?.props?.[component.name]?.config?.text
												}
											/>
										</div>
									</div>
								</div>
							)}
							{curComponent?.props?.[component.name]?.type ===
								'componentFunction' && (
								<div className="flex flex-col gap-[12px] mt-[12px]">
									<div
										style={{ display: 'flex', alignItems: 'center', gap: 10 }}
									>
										<div>组件: </div>
										<div>
											<TreeSelect
												style={{ width: 160 }}
												treeData={components}
												fieldNames={{
													label: 'name',
													value: 'id',
												}}
												onChange={(value) => {
													componentChange(component.name, value)
												}}
												value={
													curComponent?.props?.[component.name]?.config
														?.componentId
												}
											/>
										</div>
									</div>
									{componentMethodMap[selectedComponent?.name || ''] && (
										<div
											style={{ display: 'flex', alignItems: 'center', gap: 10 }}
										>
											<div>方法: </div>
											<div>
												<Select
													style={{ width: 160 }}
													options={componentMethodMap[
														selectedComponent?.name || ''
													].map((method) => ({
														label: method.label,
														value: method.name,
													}))}
													value={
														curComponent?.props?.[component.name]?.config
															?.method
													}
													onChange={(value) => {
														componentMethodChange(component.name, value)
													}}
												/>
											</div>
										</div>
									)}
								</div>
							)}
						</Collapse.Panel>
					</Collapse>
				)
			})}
		</div>
	)
}
export default Event
