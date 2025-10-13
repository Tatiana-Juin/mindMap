import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }) {
  return (
    <div
      style={{
        padding: '10px 20px',
        border: '1px solid #777',
        borderRadius: '5px',
        backgroundColor: '#fff',
      }}
    >
      <div>{data.label}</div>

      {/* Handle en haut */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        // style={{ background: '#555' }}
      />

      {/* Handle à droite */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        // style={{ background: '#555' }}
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
