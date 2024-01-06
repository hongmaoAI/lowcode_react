// zustand
import { create } from 'zustand'
// types
import type { State, Action } from '../../types/component'

export const useComponents = create<State & Action>((set) => ({
	components: [],
	addComponent: (component) =>
		set((state) => {
			return { components: [...state.components, component] }
		}),
}))
