import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data,id }) {
  // Fonction aui est appeller quand l'utilisateur saisie du texte dans input 
   const onChange = (evt) => {
        // Appelle la fonction onLabelChange qui est dans mon composant parent 
        if (data.onLabelChange) {
            data.onLabelChange(id, evt.target.value);
        }
    };
  return (
    <div
      style={{
        padding: '10px 20px',
        border: '1px solid #777',
        borderRadius: '5px',
        backgroundColor: '#fff',
      }}
    >
      {/* Champs de saisie du texte dans les node  norag => empeche de bouger la node pendant qu'on ecris */}
         <input
            
            className="nodrag" 
            value={data.label}
            onChange={onChange}
            style={{ 
                border: 'none', 
                textAlign: 'center', 
                width: '100%', 
                boxSizing: 'border-box' 
            }}
        />

      {/* Handle en haut */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
       
      />

      {/* Handle à droite */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
       
      />

      {/* Handle en bas */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#555' }}
      />

      {/* Handle à gauche */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: '#555' }}
      />
    </div>
  );
}
