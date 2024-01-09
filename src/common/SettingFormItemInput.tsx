import React, { useState } from 'react'
// antd
import { Input } from 'antd'
// icons
import { SettingOutlined } from '@ant-design/icons'
// component
import SelectVariableModal from './SelectVariableModal'

interface Value {
	type: 'static' | 'variable'
	value: any
}

interface PropsType {
	value?: Value
	onChange?: (value: Value) => void
}

export default function SettingFormItemInput({ value, onChange }: PropsType) {
	const [visible, setVisible] = useState(false)
	function valueChange(e: any) {
		onChange &&
			onChange({
				type: 'static',
				value: e?.target?.value,
			})
		console.log(e.target.value)
	}
	function select(record: any) {
		onChange &&
			onChange({
				type: 'variable',
				value: record.name,
			})
		setVisible(false)
	}
	return (
		<div className="flex gap-[8px]">
			<Input
				disabled={value?.type === 'variable'}
				value={value?.type === 'static' || !value ? value?.value : ''}
				onChange={valueChange}
			/>
			<SettingOutlined
				className="cursor-pointer"
				style={{ color: value?.type === 'variable' ? 'blue' : '' }}
				onClick={() => setVisible(true)}
			/>
			<SelectVariableModal
				open={visible}
				onCancel={() => setVisible(false)}
				onSelect={select}
			/>
		</div>
	)
}
