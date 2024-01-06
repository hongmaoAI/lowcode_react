import React from 'react'
// antd
import { Space as AntdSpace } from 'antd'
// react-dnd
import { useDrop } from 'react-dnd'
// item-type
import { ItemType } from '../item-type'

interface Props {
	children: any
	id: number
}

export default function Space({ children, id }: Props) {
	const [{ canDrop }, drop] = useDrop(() => ({
		accept: [ItemType.Space, ItemType.Button],
		drop: (_, monitor) => {
			const didDrop = monitor.didDrop()
			if (didDrop) {
				return
			}
			return {
				id,
			}
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}))
	if (!children?.length) {
		return (
			<AntdSpace
				ref={drop}
				className="p-[16px]"
				style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
			>
				暂无内容
			</AntdSpace>
		)
	}
	return (
		<AntdSpace
			ref={drop}
			className="p-[16px]"
			style={{ border: canDrop ? '1px solid #ccc' : 'none' }}
		>
			{children}
		</AntdSpace>
	)
}
