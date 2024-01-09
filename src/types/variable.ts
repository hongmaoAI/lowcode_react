
export interface Variable {
	name: string
	defaultValue: string
	remark: string
}

export interface State {
	variables: Variable[]
}

export interface Action {
	/**
	 * 添加组件
	 * @param component 组件属性
	 * @param parentId 上级组件id
	 * @memberof Action
	 */
	setVariables: (variables: Variable[]) => void
}
