export interface Component {
	id: number // 组件唯一标识
	name: string // 组件名称
	props: any // 组件属性
	children?: Component[] // 子组件
}

export interface State {
	components: Component[]
}

export interface Action {
	addComponent: (component: Component) => void
}
