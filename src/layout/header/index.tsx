import React from 'react'
// antd
import { Button, Space } from 'antd'
// useComponent
import { useComponents } from '../../app/hooks/useComponents'

export default function Header() {
	const { mode, setMode, setCurComponentId } = useComponents()
	return (
		<div className="flex justify-end w-[100%] px-[24px]">
			<Space>
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
	)
}
