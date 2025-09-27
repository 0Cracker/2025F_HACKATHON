import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function RootNode({ data }: NodeProps<{ label: string }>) {
  return (
    <div className="px-6 py-3 border-2 border-stone-800 bg-stone-900 rounded-lg shadow-xl text-white font-bold">
      {/* 하위 노드와 연결될 핸들 */}
      <Handle type="source" position={Position.Bottom} />
      <div>{data.label}</div>
    </div>
  );
}

export default memo(RootNode);