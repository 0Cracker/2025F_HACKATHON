import React from 'react';
import TextInput from './TextInput';

const MainContent = () => {
  return (
    <main className="flex-1 flex flex-col p-4 md:p-6">
      {/* flex-grow를 사용하여 이 컨테이너가 남은 공간을 모두 차지하게 만들어
        ChatInput 컴포넌트를 하단에 고정시키는 효과를 줍니다.
      */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">
          아이디어를 시작하세요.
        </h1>
      </div>
      <TextInput />
    </main>
  );
};

export default MainContent;