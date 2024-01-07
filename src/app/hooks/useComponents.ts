// zustand
import { create } from 'zustand'
// types
import type { State, Action, Component } from '../../types/component'

/**
 * 根据id递归查找组件
 */
function getComponentById(
	id: number,
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

export const useComponents = create<State & Action>((set) => ({
	components: [],
	addComponent: (component, parentId) =>
		set((state) => {
			// 如果有上级id，把当前组件添加到父组件的子组件
			if (parentId) {
				// 通过父id递归查找父组件
				const parentComponent = getComponentById(parentId, state.components)
				if (parentComponent) {
					if (parentComponent.children) {
						parentComponent?.children?.push(component)
					} else {
						parentComponent.children = [component]
					}
				}
				return { components: [...state.components] }
			}
			return { components: [...state.components, component] }
		}),
	setCurComponentId: (componentId) =>
		set((state) => ({
			curComponentId: componentId,
			curComponent: getComponentById(componentId, state.components),
		})),
}))
