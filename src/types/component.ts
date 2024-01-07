/*
 * @Author: hong
 * @Date: 2024-01-07 11:49:34
 * @LastEditTime: 2024-01-07 12:04:16
 * @Description: 请填写简介
 */
export interface Component {
	id: number // 组件唯一标识
	name: string // 组件名称
	props: any // 组件属性
	children?: Component[] // 子组件
}

export interface State {
	components: Component[]
	curComponentId?: number
	curComponent?: Component | null
}

export interface Action {
	/**
	 * 添加组件
	 * @param component 组件属性
	 * @param parentId 组件Id
	 * @memberof Action
	 */
	addComponent: (component: Component, parentId?: number) => void
	/**
	 * 设置当前组件Id
	 * @param componentId 组件Id
	 * @memberof Action
	 */
	setCurComponentId: (componentId: number) => void
	/**
	 * 更新组件
	 * @param componentId 组件Id
	 * @param props 新组建属性
	 * @memberof Action
	 */
	updateComponentProps: (componentId: number, props: any) => void
}
