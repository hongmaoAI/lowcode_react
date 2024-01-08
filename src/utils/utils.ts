import type { Component } from '../types/component'

/**
 * 根据id递归查找组件
 */
export function getComponentById(
	id: number | string,
	components: Component[]
): Component | null {
	if (!id) return null
	for (const component of components) {
		if (component.id == id) return component
		if (component.children && component.children.length > 0) {
			const result = getComponentById(id, component.children)
			if (result !== null) return result
		}
	}
	return null
}
