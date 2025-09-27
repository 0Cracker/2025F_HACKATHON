'use client'; // 클라이언트 컴포넌트로 지정

import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';
import RootNode from './nodes/RootNode'; // RootNode import
import ChildNode from './nodes/ChildNode'; // ChildNode import

// React Flow의 기본 CSS를 import합니다.
import 'reactflow/dist/style.css';

// 초기 노드와 엣지 데이터 (임시)
const initialNodes: Node[] = [
  { id: 'root-1', type: 'rootNode', position: { x: 0, y: 0 }, data: { label: '해커톤 주제: 고립' } },
  { id: 'child-1', type: 'childNode', position: { x: -200, y: 150 }, data: { label: '정서적 고립' } },
  { id: 'child-2', type: 'childNode', position: { x: 200, y: 150 }, data: { label: '물리적 고립' } },
];

const initialEdges: Edge[] = [
  { id: 'edge-1', source: 'root-1', target: 'child-1' },
  { id: 'edge-2', source: 'root-1', target: 'child-2' },
];

// 커스텀 노드 타입을 등록합니다.
const nodeTypes = {
  rootNode: RootNode, // 'rootNode' 타입과 RootNode 컴포넌트 연결
  childNode: ChildNode, // 'childNode' 타입과 ChildNode 컴포넌트 연결
};

export default function MindMapCanvas() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange: OnEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes} // 커스텀 노드 등록
        fitView // 모든 노드가 보이도록 뷰를 조절
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}