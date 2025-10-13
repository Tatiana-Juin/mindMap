
import {useCallback,useState } from 'react';
import  {
  ReactFlow,
  Background,
  Controls,
  
  useNodesState,
  useEdgesState,
  addEdge,
  
} from '@xyflow/react';
import CustomNode from './CustomNode';
import '@xyflow/react/dist/style.css';


// POUR DIRE QUE JE CUSTOM LES HANDLE 
const nodeTypes = { custom: CustomNode };

// J'ai deja une  premiere boite noeud en position x et y ET type: 'custom' veut dire que je custom les handle ajoute a droite et a gauche 

const initialNodes = [
  { id: "1", position: { x: 100, y: 50 }, type: 'custom', data: { label: "Premier node" } },
];



// aucun fil
const initialEdges = [];

export default function MindMapEditor() {
    // TIEN MOI A JOUR DE MES BOITE (nodes) ET E MES FILS (EDGE)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const addNode = useCallback(() => {
      // creation d'un nouveau node 
        const newNode = {
            id: (nodes.length + 1).toString(), 
            type:'custom',
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
    <div style={{ height: 700 }}>
      <button onClick={addNode}>+ Ajouter un node</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // ajuster la camera pour tout voir 
        fitView
        // pour que le type soit un trait droit 
        defaultEdgeOptions={{ type: 'straight' }}
        // avant la liaison on veutt que se soit droit et non en courbe 
        connectionLineType="straight"  
        nodeTypes={nodeTypes} // 👈 ajoute ceci
      >
        
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
