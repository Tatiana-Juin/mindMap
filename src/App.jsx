import { useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ReactFlowProvider } from '@xyflow/react';
import MindMapEditor from './components/MindMapEditor'



import React from 'react'
import MindMap from '../../test/src/components/MindMap'

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}> 
         
          <ReactFlowProvider>
            <MindMapEditor />
          </ReactFlowProvider>
        </div>
  )
}

