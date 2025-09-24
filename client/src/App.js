// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import CarDetails from "./pages/CarDetails";
import { Login } from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useAppContext } from "./context/AppContext";

// Owner Dashboard Pages
import Layout from "./pages/owner-dashboard/Layout";
import Dashboard from "./pages/owner-dashboard/Dashbord";
import Managebooking from "./pages/owner-dashboard/Managebooking";
import AddCar from "./pages/owner-dashboard/AddCar";
import CarMange from "./pages/owner-dashboard/CarMange";

function AppContent() {
  const { showLogin} = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner-dashboard");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
      
      {/* Same Background Effects as Hero.jsx */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/40 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/40 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute inset-0 bg-radial-gradient at-center from-transparent via-blue-900/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Toaster />
        {showLogin && <Login />}

        {/* Always show Navbar but conditionally style it */}
        {!isOwnerPath && <Navbar/>}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/car-details/:id" element={<CarDetails />} />

          {/* Owner Dashboard Routes */}
          <Route path="/owner-dashboard/*" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-bookings" element={<Managebooking />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="car-manage" element={<CarMange />} />
          </Route>
        </Routes>

        {!isOwnerPath && <Footer />}
      </div>

      {/* Same Custom Animations as Hero.jsx */}
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
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;