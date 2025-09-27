import React from 'react';

const MOCK_CHAT_HISTORY = [
  "프로젝트1",
  "프로젝트2",
  "프로젝트3",
  "프로젝트4",
  "프로젝트5",
  "프로젝트6",
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 bg-[#1e1f20] p-4 flex-col">
      <nav className="flex-grow">
        <p className="text-sm text-gray-400 mb-4 px-2">최근</p>
        <ul>
          {MOCK_CHAT_HISTORY.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className="block p-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200 truncate text-sm"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;