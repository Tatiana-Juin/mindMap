
import {useCallback,useEffect } from 'react';
import  {
  ReactFlow,
  Background,
  Controls,
  
  useNodesState,
  useEdgesState,
  addEdge,
  
} from '@xyflow/react';
import CustomNode from './CustomNode';
import { toPng } from 'html-to-image';
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

    // Mise A jour du label 
    const onLabelChange=useCallback(
      (id,newLabel) =>{
        setNodes((nds) =>
          nds.map((node)=>{
              if(node.id === id){
                return{
                  ...node,
                  data:{
                    ...node.data,
                    label:newLabel,
                  },
                };
              }
              return node;
          } )
        );
      },
      [setNodes]
    );


   useEffect(() => {
           setNodes((nds) => 
               nds.map(node => {
                  //  si id === 1 et que le texte a changer alors on recupere les data et on change le label en récuperant le nouveau 
                   if (node.id === "1" && !node.data.onLabelChange) {
                       return {
                           ...node,
                           data: {
                               ...node.data,
                               onLabelChange: onLabelChange, 
                           },
                       };
                   }
                   return node;
               })
           );
       }, [setNodes, onLabelChange]); 

    const addNode = useCallback(() => {
      // creation d'un nouveau node 
        const newNode = {
            id: (nodes.length + 1).toString(), 
            type:'custom',
            // position aleatoire de 0 a 300 px
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { label: `Node ${nodes.length + 1}`,  onLabelChange: onLabelChange,},
        };
        // pour créer un nouveau tabbleau avec les ancien node et les nouveau 
        setNodes((nds) => [...nds, newNode]);
        // pour useCallback créer addNode que si nodes ou setNodes change => ameliore les performances 
    }, [nodes, setNodes,onLabelChange]);

    // Pour relier les bouton les edges
    const onConnect = useCallback(
      (params) => setEdges( (eds) => addEdge(params,eds) ),
      [setEdges]
    );

     // 
        const onExportImage = useCallback(() => {
            // Ciblez l'élément DOM de ReactFlow 
            const flowElement = document.querySelector('.react-flow');
    
            if (flowElement) {
                
                toPng(flowElement, {
                    
                    backgroundColor: '#ffffff', 
                    // sans le bouton d'exportationet de creation de node
                    filter: (node) => node.tagName !== 'BUTTON', 
                }).then((dataUrl) => {
                    // pour le telechargement
                    const a = document.createElement('a');
                    a.setAttribute('href', dataUrl);
                    a.setAttribute('download', 'mindmap.png');
                    a.click();
                });
            }
        }, []); // Aucune dépendance à l'instance n'est strictement nécessaire pour html-to-image simple
  
  return (
    <div style={{ height: 700 }}>
      <button onClick={addNode}>+ Ajouter un node</button>
        <button onClick={onExportImage} style={{ marginLeft: '10px' }}>
              ⬇️ Exporter en image
        </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // ajuster la camera pour tout voir 
        fitView
        // pour que le type soit un escalier 
        defaultEdgeOptions={{ 
          type: 'smoothstep',
          style: { 
                  strokeWidth: 2, // Rend le trait plus visible
                  stroke: '#222', // Une couleur foncée et explicite
                },
         
        }}
        // avant la liaison on veutt que se soit droit et non en courbe 
        connectionLineType="smoothstep"  
        nodeTypes={nodeTypes} 
      >
        
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
