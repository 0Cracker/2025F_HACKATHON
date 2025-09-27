import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react'; // 아이콘

function TxtNode({ data }: NodeProps<{ label: string }>) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 상위 노드와 연결될 핸들 */}
      <Handle type="target" position={Position.Top} className="!bg-stone-500" />
      
      {/* 노드의 제목 부분 */}
      <div className="p-3 bg-gray-50 rounded-t-lg border-b">
        <p className="font-semibold text-gray-700">{data.label}</p>
      </div>

      {/* 메모를 입력하는 Textarea */}
      <div className="p-3">
        <Textarea placeholder="여기에 생각을 자유롭게 적어보세요..." className="text-sm" />
      </div>

      {/* 아이디어 제안 버튼 */}
      <div className="p-3 border-t bg-gray-50 rounded-b-lg">
        <Button className="w-full">
          <Lightbulb className="mr-2 h-4 w-4" />
          AI에게 아이디어 제안받기
        </Button>
      </div>
    </div>
  );
}

export default memo(TxtNode);