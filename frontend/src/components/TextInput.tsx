'use client'

import React, { useState } from 'react';
import { Plus, Image, Mic, Send } from 'lucide-react';

const ChatInput = () => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        className="relative flex items-center bg-[#1e1f20] rounded-full p-2 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <button type="button" className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
          <Plus size={20} />
        </button>
        
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="아이디어 입력"
          className="flex-1 w-full bg-transparent px-4 text-gray-200 placeholder-gray-500 focus:outline-none"
        />
        
        <div className="flex items-center gap-2">
          <button type="button" className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
            <Image size={20} />
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
            <Mic size={20} />
          </button>
          {prompt && (
            <button 
              type="submit" 
              className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Send size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;