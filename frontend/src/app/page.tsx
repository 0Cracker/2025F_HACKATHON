
import StateChart from '@/components/StateCharts';
import './global.css'; // 기본 CSS 포함
import './globals.css'; // 기본 CSS 포함

export default function Home() {
  return (
    <main>
      <h1>GoJS State Chart with Next.js</h1>
      <p>This sample creates a state chart to story-board an online shopping experience.</p>
      
      {/* StateChart 컴포넌트 렌더링 */}
      
      <StateChart />

    </main>
  );
}