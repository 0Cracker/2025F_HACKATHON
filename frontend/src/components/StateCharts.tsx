'use client'; // 👈 이 컴포넌트가 클라이언트에서만 실행되도록 명시!

import React, { useState, useRef } from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

// 초기 다이어그램 데이터 (기존 HTML의 textarea에 있던 JSON)
const INITIAL_MODEL = {
  nodeDataArray: [
    { id: -1, loc: '155 -150', type: 'Start', text: 'Start' },
    { id: 0, loc: '190 15', text: 'Shopping' },
    { id: 1, loc: '353 32', text: 'Browse Items' },
    { id: 2, loc: '353 166', text: 'Search Items' },
    { id: 3, loc: '552 12', text: 'View Item' },
    { id: 4, loc: '700 -95', text: 'View Cart' },
    { id: 5, loc: '660 100', text: 'Update Cart' },
    { id: 6, loc: '850 20', text: 'Checkout' },
    { id: -2, loc: '830 200', type: 'End', text: 'End' },
  ],
  linkDataArray: [
    { from: -1, to: 0, progress: true, text: 'Visit online store', curviness: -10 },
    { from: 0, to: 1, progress: true, text: 'Browse' },
    { from: 0, to: 2, progress: true, text: 'Use search bar', curviness: -70 },
    { from: 1, to: 2, progress: true, text: 'Use search bar' },
    { from: 2, to: 3, progress: true, text: 'Click item', curviness: -70 },
    { from: 2, to: 2, progress: false, text: 'Another search', curviness: 40 },
    { from: 1, to: 3, progress: true, text: 'Click item' },
    { from: 3, to: 0, progress: false, text: 'Not interested', curviness: -100 },
    { from: 3, to: 4, progress: true, text: 'Add to cart' },
    { from: 4, to: 0, progress: false, text: 'More shopping', curviness: -150 },
    { from: 4, to: 5, progress: false, text: 'Update needed', curviness: 70 },
    { from: 5, to: 4, progress: false, text: 'Update made' },
    { from: 4, to: 6, progress: true, text: 'Proceed' },
    { from: 6, to: 5, progress: false, text: 'Update needed' },
    { from: 6, to: -2, progress: true, text: 'Purchase made' },
  ],
};


export default function StateChart() {
  const diagramRef = useRef<ReactDiagram>(null);

  // React의 state로 다이어그램 데이터를 관리
  const [nodeDataArray, setNodeDataArray] = useState(INITIAL_MODEL.nodeDataArray);
  const [linkDataArray, setLinkDataArray] = useState(INITIAL_MODEL.linkDataArray);
  const [savedModelText, setSavedModelText] = useState(JSON.stringify(INITIAL_MODEL, null, 2));

  // 다이어그램 초기화 함수
  const initDiagram = (): go.Diagram => {
    const $ = go.GraphObject.make;
    
    const myDiagram = $(go.Diagram, {
      'animationManager.initialAnimationStyle': go.AnimationStyle.None,
      'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
      'clickCreatingTool.archetypeNodeData': { text: 'new node' },
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key', // ReactDiagram 사용 시 권장
        nodeKeyProperty: 'id'
      })
    });

    const colors = {
      pink: '#facbcb', blue: '#b7d8f7', green: '#b9e1c8', yellow: '#faeb98', background: '#e8e8e8'
    };
    if (myDiagram.div) myDiagram.div.style.backgroundColor = colors.background;

    // Node 템플릿 정의 (기존 코드와 거의 동일)
    myDiagram.nodeTemplate =
      $(go.Node, 'Auto', {
          isShadowed: true, shadowBlur: 0, shadowOffset: new go.Point(5, 5), shadowColor: 'black'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle', {
            strokeWidth: 1.5, fill: colors.blue, portId: '',
            fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          new go.Binding('fill', 'type', (type) => {
            if (type === 'Start') return colors.green;
            if (type === 'End') return colors.pink;
            return colors.blue;
          }),
          new go.Binding('figure', 'type', (type) => {
            if (type === 'Start' || type === 'End') return 'Circle';
            return 'RoundedRectangle';
          })
        ),
        $(go.TextBlock, {
            margin: 8, font: 'bold 14px sans-serif', stroke: '#333', editable: true
          },
          new go.Binding('text').makeTwoWay()
        )
      );

    // Adornment 템플릿 정의 (새 노드 추가 버튼)
    myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, 'Spot',
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: null, stroke: colors.pink, strokeWidth: 3 }),
          $(go.Placeholder)
        ),
        $('Button', {
            alignment: go.Spot.TopRight,
            click: addNodeAndLink // 클릭 이벤트 핸들러 연결
          },
          $(go.Shape, 'PlusLine', { width: 6, height: 6 })
        )
      );
    
    // Link 템플릿 정의 (기존 코드와 거의 동일)
    myDiagram.linkTemplate = 
      $(go.Link, {
          isShadowed: true, shadowBlur: 0, shadowColor: 'black', shadowOffset: new go.Point(2.5, 2.5),
          curve: go.Curve.Bezier, curviness: 40, reshapable: true,
          relinkableFrom: true, relinkableTo: true,
          fromShortLength: 8, toShortLength: 10
        },
        new go.Binding('points').makeTwoWay(),
        new go.Binding('curviness'),
        $(go.Shape, { strokeWidth: 2, shadowVisible: false, stroke: 'black' },
          new go.Binding('strokeDashArray', 'progress', (p) => (p ? [] : [5, 6])),
          new go.Binding('opacity', 'progress', (p) => (p ? 1 : 0.5)),
        ),
        $(go.Shape, { fromArrow: 'circle', strokeWidth: 1.5, fill: 'white' },
          new go.Binding('opacity', 'progress', (p) => (p ? 1 : 0.5))
        ),
        $(go.Shape, { toArrow: 'standard', stroke: null, scale: 1.5, fill: 'black' },
          new go.Binding('opacity', 'progress', (p) => (p ? 1 : 0.5))
        ),
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', {
            shadowVisible: true, fill: colors.yellow, strokeWidth: 0.5
          }),
          $(go.TextBlock, {
              font: '9pt helvetica, arial, sans-serif', margin: 1, editable: true, text: 'Action'
            },
            new go.Binding('text').makeTwoWay()
          )
        )
      );

    return myDiagram;
  };

  // 새 노드와 링크를 추가하는 함수 (React State 사용하도록 수정)
  const addNodeAndLink = (e: go.InputEvent, obj: go.GraphObject) => {
    const adorn = obj.part as go.Adornment;
    const fromNode = adorn.adornedPart as go.Node;
    const fromData = fromNode.data;

    const diagram = e.diagram;
    diagram.startTransaction('Add State');

    const p = fromNode.location.copy();
    p.x += 200;

    const toData = {
      id: Date.now(), // 고유한 키 생성
      text: 'new',
      loc: go.Point.stringify(p)
    };
    
    // React State 업데이트
    setNodeDataArray(prev => [...prev, toData]);

    const linkData = {
      from: fromData.id,
      to: toData.id,
      progress: false,
      text: 'transition'
    };

    // React State 업데이트
    setLinkDataArray(prev => [...prev, linkData]);

    diagram.commitTransaction('Add State');

    // 새 노드를 선택하고 화면에 보이도록 스크롤
    const newNode = diagram.findNodeForData(toData);
    if (newNode) {
      diagram.select(newNode);
      diagram.scrollToRect(newNode.actualBounds);
    }
  };

  // Save 함수
  const handleSave = () => {
    const diagram = diagramRef.current?.getDiagram();
    if (diagram) {
      setSavedModelText(diagram.model.toJson());
      diagram.isModified = false;
    }
  };

  // Load 함수
  const handleLoad = () => {
    const diagram = diagramRef.current?.getDiagram();
    if (diagram) {
        const model = go.Model.fromJson(JSON.parse(savedModelText));
        setNodeDataArray(model.nodeDataArray);
        setLinkDataArray(model.linkDataArray);
    }
  };

  return (
    <div>
      <ReactDiagram
        ref={diagramRef}
        divClassName='diagram-component'
        initDiagram={initDiagram}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        onModelChange={(changes) => {
            // 다이어그램 내에서 변경이 발생했을 때(예: 노드 이동, 텍스트 편집) state에 반영
            console.log(changes);
        }}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
        <p>Diagram Model saved in JSON format:</p>
        <textarea
          style={{ width: '100%', height: '300px' }}
          value={savedModelText}
          onChange={(e) => setSavedModelText(e.target.value)}
        />
      </div>
    </div>
  );
}