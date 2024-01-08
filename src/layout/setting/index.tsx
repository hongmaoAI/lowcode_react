import React, { useState } from 'react'
// antd
import { Segmented } from 'antd'
// type
import type { SegmentedValue } from 'antd/es/segmented'
// component
import Attr from './Attr'
import Event from './Event'

export default function Setting() {
	const [key, setKey] = useState<SegmentedValue>('属性')

	return (
		<div>
			<Segmented
				options={['属性', '事件']}
				block
				value={key}
				onChange={setKey}
			/>
			<div className="pt-[20px]">
				{key === '属性' && <Attr />}
				{key === '事件' && <Event />}
			</div>
		</div>
	)
}
