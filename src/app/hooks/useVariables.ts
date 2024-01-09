// zustand
import { create } from 'zustand'
// type
import type { Action, State } from '../../types/variable'

export const useVariables = create<Action & State>((set) => ({
	variables: [],
	setVariables: (variables) => set({ variables }),
}))
