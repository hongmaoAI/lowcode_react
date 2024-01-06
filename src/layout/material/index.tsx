import React from 'react'

import ComponentItem from '../../common/component-item'
import { ItemType } from '../../item-type'
// app -> hooks
import { useComponents } from '../../app/hooks/useComponents'

export default function Material() {
	const { addComponent } = useComponents()
	const onDragEnd = (dropResult: { name: string; id: number; props: any }) => {
		addComponent({
			id: new Date().getTime(),
			name: dropResult.name,
			props: dropResult.props,
		},dropResult.id)
	}
	return (
		<div className="flex p-[10px] gap-4 flex-wrap">
			<ComponentItem
				onDragEnd={onDragEnd}
				description="按钮"
				name={ItemType.Button}
			/>
			<ComponentItem
				onDragEnd={onDragEnd}
				description="间距"
				name={ItemType.Space}
			/>
		</div>
	)
}
