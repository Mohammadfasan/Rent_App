// src/pages/owner-dashboard/Layout.jsx

import React from 'react';
import Sidebar from '../../components/owner-dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbarown from '../../components/owner-dashboard/Navbarown';

const Layout = () => {
  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      {/* Navbar at the top */}
      <Navbarown />
      
      {/* Main content area with sidebar */}
      <div className='flex flex-1'>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content, rendered by Outlet */}
        <main className='flex-1 p-6 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;