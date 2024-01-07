import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

interface Props {
	componentId: number
	containerClassName: string
	offsetContainerClassName: string
}

const SelectedMask = forwardRef(function SelectedMask(
	{ componentId, containerClassName, offsetContainerClassName }: Props,
	ref: any
) {
	const [position, setPosition] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	})

	useEffect(() => {
		if (componentId) {
			updatePosition()
		}
	}, [componentId])
	useImperativeHandle(ref, () => ({
		updatePosition,
	}))

	function updatePosition() {
		if (!componentId) return
		const container = document.querySelector(`.${offsetContainerClassName}`)
		if (!container) return
		const node = document.querySelector(`[data-component-id="${componentId}"]`)
		if (!node) return
		// 获取节点位置
		const { top, left, width, height } = node.getBoundingClientRect()
		// 获取容器位置
		const { top: containerTop, left: containerLeft } =
			container.getBoundingClientRect()
		// 计算位置
		setPosition({
			top: top - containerTop + container.scrollTop,
			left: left - containerLeft,
			width,
			height,
		})
	}

	return createPortal(
		<>
			<div
				style={{
					position: 'absolute',
					left: position.left,
					top: position.top,
					backgroundColor: 'rgba(66, 133, 244, 0.2)',
					border: '1px solid rgb(66, 133, 244)',
					pointerEvents: 'none',
					width: position.width,
					height: position.height,
					zIndex: 1003,
					borderRadius: 4,
					boxSizing: 'border-box',
				}}
			/>
		</>,
		document.querySelector(`.${containerClassName}`)!
	)
})

export default SelectedMask
