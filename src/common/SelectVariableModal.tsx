import React from 'react'
// antd
import { Modal, Table } from 'antd'
// useVariables
import { useVariables } from '../app/hooks/useVariables'

interface Props {
	open: boolean
	onCancel: () => void
	onSelect: (record: any) => void
}

const columns = [
	{
		title: '变量名',
		dataIndex: 'name',
	},
	{
		title: '变量值',
		dataIndex: 'defaultValue',
	},
	{
		title: '备注',
		dataIndex: 'remark',
	},
]

export default function SelectVariableModal({
	open,
	onCancel,
	onSelect,
}: Props) {
	const { variables } = useVariables()
	const rowSelect = (record: any) => {
		onSelect(record)
	}
	return (
		<Modal open={open} onCancel={onCancel} title="选择变量" width={800}>
			<Table
				dataSource={variables}
				columns={columns}
				onRow={(record) => ({
					onClick: () => {
						rowSelect(record)
					},
				})}
				rowKey={(record) => record.name}
			/>
		</Modal>
	)
}
