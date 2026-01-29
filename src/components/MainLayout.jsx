import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080c]">
      {/* Pass state to sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* 
        MAIN CONTENT AREA 
        The transition-all and duration-300 ensures smooth width resizing
      */}
      <main 
        className={`
          transition-all duration-300 ease-in-out min-h-screen
          ${isCollapsed ? 'pl-20' : 'pl-64'}
        `}
      >
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;