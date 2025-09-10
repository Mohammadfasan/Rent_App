// src/App.js
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import CarDetails from "./pages/CarDetails";

// Owner Dashboard Pages
import Layout from "./pages/owner-dashboard/Layout";
import Dashboard from "./pages/owner-dashboard/Dashbord";
import Managebooking from "./pages/owner-dashboard/Managebooking";
import AddCar from "./pages/owner-dashboard/AddCar";
import CarMange from "./pages/owner-dashboard/CarMange";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const isOwnerPath = location.pathname.startsWith("/owner-dashboard");

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/car-details/:id" element={<CarDetails />} />

        {/* Owner Dashboard (Nested Routes) */}
        <Route path="/owner-dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* default page */}
          <Route path="manage-bookings" element={<Managebooking />} />
          <Route path="add-car" element={<AddCar />} />
        
          <Route path="car-manage" element={<CarMange />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
}

export default App;