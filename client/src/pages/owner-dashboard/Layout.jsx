// src/pages/owner-dashboard/Layout.jsx

import React, { useEffect } from 'react';
import Sidebar from '../../components/owner-dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbarown from '../../components/owner-dashboard/Navbarown';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const {isOwner,navigate}=useAppContext()

  useEffect(()=>
  {
    if(!isOwner)
    {
      navigate("/")
    }
  },[isOwner])
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
      
      {/* Same Background Effects as App.js */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/40 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/40 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute inset-0 bg-radial-gradient at-center from-transparent via-blue-900/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar at the top */}
        <Navbarown />
        
        {/* Main content area with sidebar */}
        <div className='flex flex-1 overflow-hidden'>
          
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main content, rendered by Outlet */}
          <main className='flex-1 p-6 overflow-y-auto'>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Same Custom Animations as App.js */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-radial-gradient {
          background-image: radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%);
        }
        
        /* Additional animations from Hero.jsx */
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        }
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Layout;