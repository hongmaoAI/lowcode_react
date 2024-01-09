import React, { useEffect } from 'react'
// antd
import { Modal, Form, Button, Space, Input, Select } from 'antd'
// useVariables
import { useVariables } from '../../app/hooks/useVariables'
// type
import type { Variable } from '../../types/variable'
// icons
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

interface PropsType {
	open: boolean
	onCancel: () => void
}

export default function DefineVariables({ open, onCancel }: PropsType) {
	const [form] = Form.useForm()
	const { setVariables, variables } = useVariables()
	const onFinish = (values: { variables: Variable[] }) => {
		setVariables(values.variables)
		onCancel && onCancel()
	}
	useEffect(() => {
		if (open) {
			form.setFieldsValue({ variables })
		}
	}, [open])
	return (
		<Modal
			open={open}
			onCancel={onCancel}
			width={700}
			title="定义变量"
			onOk={() => {
				form.submit()
			}}
      destroyOnClose
		>
			<Form<{ variables: Variable[] }>
				form={form}
				className="py-[20px]"
				onFinish={onFinish}
			>
				<Form.List name="variables">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space>
									<Form.Item
										{...restField}
										name={[name, 'name']}
										rules={[{ required: true, message: '变量名不能为空' }]}
									>
										<Input placeholder="变量名" />
									</Form.Item>
									<Form.Item {...restField} name={[name, 'type']}>
										<Select
											style={{ width: 140 }}
											options={[{ label: '字符串', value: 'string' }]}
											placeholder="类型"
										/>
									</Form.Item>
									<Form.Item {...restField} name={[name, 'defaultValue']}>
										<Input placeholder="默认值" />
									</Form.Item>
									<Form.Item {...restField} name={[name, 'remark']}>
										<Input placeholder="备注" />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button
									type="dashed"
									icon={<PlusOutlined />}
									block
									onClick={() => add({ type: 'string' })}
								>
									添加变量
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</Modal>
	)
}
