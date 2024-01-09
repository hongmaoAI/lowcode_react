import React, { useState } from 'react'
// antd
import { Button, Space } from 'antd'
// useComponent
import { useComponents } from '../../app/hooks/useComponents'
// component
import ComponentTree from './ComponentTree'
import ComponentVariable from './DefineVariables'

export default function Header() {
	const { mode, setMode, setCurComponentId } = useComponents()
	const [isComponentTree, setComponentTree] = useState<boolean>(false)
	const [isComponentVariable, setComponentVariable] = useState<boolean>(false)
	const treeHandleCancel = () => {
		setComponentTree(false)
	}
	const variableHandleCancel = () => {
		setComponentVariable(false)
	}
	return (
		<div className="h-[100%] w-[100%]">
			<div className="flex justify-between px-[24px] items-center h-[50px]">
				<Space className="flex-1 flex justify-end">
					<Button type="primary" onClick={() => setComponentTree(true)}>
						查看大纲
					</Button>
					<Button type="primary" onClick={() => setComponentVariable(true)}>
						定义变量
					</Button>
					{mode === 'edit' && (
						<Button
							type="primary"
							onClick={() => {
								setMode('preview')
								setCurComponentId(null)
							}}
						>
							预览
						</Button>
					)}
					{mode === 'preview' && (
						<Button
							type="primary"
							onClick={() => {
								setMode('edit')
							}}
						>
							退出预览
						</Button>
					)}
				</Space>
			</div>
			{/* TreeComponent */}
			<ComponentTree open={isComponentTree} onCancel={treeHandleCancel} />
			{/* ComponentVariable */}
			<ComponentVariable
				open={isComponentVariable}
				onCancel={variableHandleCancel}
			/>
		</div>
	)
}
