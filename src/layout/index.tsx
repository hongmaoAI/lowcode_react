import React from 'react'

// components for Layout
import Header from './header'
import Material from './material'
import Stage from './stage'
import Setting from './setting'
import ProdStage from './stage/ProdStage'
// allotment
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
// useCOmponents
import { useComponents } from '../app/hooks/useComponents'

export default function Layout() {
	const { mode } = useComponents()
	return (
		<div className="h-[100vh] flex flex-col">
			{/* up */}
			<div className="h-[50px] flex items-center bg-red-300">
				<Header />
			</div>
			{/* down */}
			{mode === 'edit' ? (
				<Allotment className="flex flex-1">
					<Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
						<Material />
					</Allotment.Pane>
					<Allotment.Pane>
						<Stage />
					</Allotment.Pane>
					<Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
						<Setting />
					</Allotment.Pane>
				</Allotment>
			) : (
				<ProdStage />
			)}
		</div>
	)
}
