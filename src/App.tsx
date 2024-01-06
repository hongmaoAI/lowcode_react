import React from 'react'
// component -> Layout
import Layout from './layout'
// react-dnd
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout/>
    </DndProvider>
  )
}
