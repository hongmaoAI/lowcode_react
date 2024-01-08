import React from 'react'
// antd
import { Modal, Tree } from 'antd'
// hooks
import { useComponents } from '../../app/hooks/useComponents'

interface ComponentTreeProps {
	open: boolean
	onCancel: () => void
}

export default function ComponentTree({ open, onCancel }: ComponentTreeProps) {
	const { components, setCurComponentId } = useComponents()
	const componentSelect = ([selectedKey]: any[]) => {
		setCurComponentId(selectedKey)
		onCancel && onCancel()
	}
	return (
		<div>
			<Modal
				open={open}
				footer={null}
				onCancel={onCancel}
				title="组件树"
				destroyOnClose
			>
				<Tree
					fieldNames={{ title: 'name', key: 'id' }}
					treeData={components as any}
					showLine
					defaultExpandAll
					onSelect={componentSelect}
				/>
			</Modal>
		</div>
	)
}
