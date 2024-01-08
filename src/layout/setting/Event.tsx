import React from 'react'
// ItemType
import { ItemType } from '../../item-type'
// hooks -> useComponent
import { useComponents } from '../../app/hooks/useComponents'
// antd
import { Collapse, Input, Select } from 'antd'

export const componentEventMap = {
	[ItemType.Button]: [
		{
			name: 'onClick',
			label: '点击事件',
		},
	],
}

const Event = () => {
	const { curComponent, curComponentId, updateComponentProps } = useComponents()
	const typeChange = (eventName: string, value: string) => {
		if (!curComponentId) return
		updateComponentProps(curComponentId, { [eventName]: { type: value } })
	}
	// 变化类型
	const messageTypeChange = (eventName: string, value: string) => {
		if (!curComponentId) return
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
										options={[{ label: '显示提示', value: 'showMessage' }]}
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
						</Collapse.Panel>
					</Collapse>
				)
			})}
		</div>
	)
}
export default Event
