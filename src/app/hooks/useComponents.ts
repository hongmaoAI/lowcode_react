// zustand
import { create } from 'zustand'
// types
import type { State, Action } from '../../types/component'
// utils
import { getComponentById } from '../../utils/utils'

export const useComponents = create<State & Action>((set) => ({
	components: [],
	curComponent: null,
	mode: 'edit',
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
			curComponent: getComponentById(componentId!, state.components),
		})),
	updateComponentProps: (componentId, props) =>
		set((state) => {
			const component = getComponentById(componentId, state.components)
			if (component) {
				component.props = { ...component.props, ...props }
				if (componentId === state.curComponentId) {
					return {
						curComponent: component,
						components: [...state.components],
					}
				}
				return { components: [...state.components] }
			}
			return { components: [...state.components] }
		}),
	setMode: (mode) => set({ mode }),
}))
