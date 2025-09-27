import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '@/lib/utils'; // shadcn/ui의 유틸리티 함수

// selected prop을 통해 선택 상태를 받아옵니다.
function ChildNode({ data, selected }: NodeProps<{ label: string }>) {
  const isSuggested = true; // TODO: 실제 데이터에 따라 이 값을 결정해야 합니다. (e.g., data.isSuggested)

  return (
    <div
      className={cn(
        'px-4 py-2 border border-stone-400 bg-stone-100 rounded-md shadow-md transition-opacity duration-300',
        // 제안 상태이고, 선택되지 않았을 때 반투명 효과 적용
        isSuggested && !selected && 'opacity-40'
      )}
    >
      {/* 상위 노드와 연결될 핸들 */}
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      {/* 하위 노드와 연결될 핸들 */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(ChildNode);