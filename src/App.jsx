import { useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge
} from '@xyflow/react'
import './App.css'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  { id: "1", position: { x: 100, y: 50 }, data: { label: "Premier node" } },
];

// aucun fil
const initialEdges = [];

function App() {
  

 const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const addNode = useCallback(() => {
      // creation d'un nouveau node 
        const newNode = {
            id: (nodes.length + 1).toString(), 
            // position aleatoire de 0 a 300 px
            position: { x: Math.random() * 300, y: Math.random() * 300 },
            data: { label: `Node ${nodes.length + 1}` },
        };
        // pour créer un nouveau tabbleau avec les ancien node et les nouveau 
        setNodes((nds) => [...nds, newNode]);
        // pour useCallback créer addNode que si nodes ou setNodes change => ameliore les performances 
    }, [nodes, setNodes]);

    // Pour relier les bouton les edges
    const onConnect = useCallback(
      (params) => setEdges( (eds) => addEdge(params,eds) ),
      [setEdges]
    );
  
  return (
    <div style={{ height: 500 }}>
      <button onClick={addNode}>+ Ajouter un node</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // ajuster la camera pour tout voir 
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}

export default App
