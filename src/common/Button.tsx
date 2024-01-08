import React, { forwardRef, useImperativeHandle, useState } from 'react'
// antd
import { Button as AntdButton } from 'antd'

const Button = forwardRef(function Button(props: any, ref: any) {
	const [loading, setLoading] = useState(false)
	useImperativeHandle(
		ref,
		() => {
			return {
				startLoading: () => {
					setLoading(true)
				},
				endLoading: () => {
					setLoading(false)
				},
			}
		},
		[]
	)
	return (
		<AntdButton loading={loading} {...props}>
			{props.children}
		</AntdButton>
	)
})

export default Button
