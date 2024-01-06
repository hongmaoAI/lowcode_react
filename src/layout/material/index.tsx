import React from 'react'

import ComponentItem from '../../common/component-item'
import { ItemType } from '../../item-type'

export default function Material() {
	const onDragEnd = (item: any) => {
		console.log(item)
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
