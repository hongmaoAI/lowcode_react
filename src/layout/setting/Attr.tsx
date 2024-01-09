import React, { useEffect } from 'react'
// antd
import { Form, Input, Select } from 'antd'
// item-type
import { ItemType } from '../../item-type'
// useComponent
import { useComponents } from '../../app/hooks/useComponents'
// component
import SettingFormItemInput from '../../common/SettingFormItemInput'

const componentSettingMap = {
	[ItemType.Button]: [
		{
			name: 'type',
			label: '按钮类型',
			type: 'select',
			options: [
				{
					label: '主按钮',
					value: 'primary',
				},
				{
					label: '次按钮',
					value: 'default',
				},
			],
		},
		{
			name: 'children',
			label: '文本',
			type: 'input',
		},
	],
	[ItemType.Space]: [
		{
			name: 'size',
			label: '间距大小',
			type: 'select',
			options: [
				{ label: '大', value: 'large' },
				{ label: '中', value: 'middle' },
				{ label: '小', value: 'small' },
			],
		},
	],
}

export default function Attr() {
	const [form] = Form.useForm()
	const { curComponentId, updateComponentProps, curComponent } = useComponents()
	useEffect(() => {
		form.setFieldsValue(curComponent?.props)
	}, [curComponent])
	const valueChange = (changeValue: any) => {
		if (curComponentId) {
			updateComponentProps(curComponentId, changeValue)
		}
	}
	function renderFormElement(setting: any) {
		const { type, options } = setting
		if (type === 'select') {
			return <Select options={options} />
		} else if (type === 'input') {
			return <SettingFormItemInput />
		}
	}
	if (!curComponentId || !curComponent) return null
	return (
		<Form
			form={form}
			onValuesChange={valueChange}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 14 }}
		>
			{(componentSettingMap[curComponent.name] || []).map((setting, index) => {
				return (
					<Form.Item name={setting.name} label={setting.label} key={index}>
						{renderFormElement(setting)}
					</Form.Item>
				)
			})}
		</Form>
	)
}
