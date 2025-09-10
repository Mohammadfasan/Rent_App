import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner-dashboard/Title";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const DashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Booking",
      value: data.totalBookings,
      icon: assets.listIconColored,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      {/* Page Title */}
      <Title title="Admin Dashboard" subtitle="Welcome to your dashboard" />

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {DashboardCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex items-center gap-4 cursor-pointer`}
          >
            <div className={`p-3 rounded-xl ${card.text} bg-white shadow-md`}>
              <img src={card.icon} alt={card.title} className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
              <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Recent Bookings */}
        <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          <p className="text-sm text-gray-500 mb-4">Latest customer activity</p>

          {data.recentBookings.length > 0 ? (
            data.recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 py-3 last:border-none rounded-lg hover:shadow-md transition-all duration-300 px-2"
              >
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 shadow-sm">
                    <img
                      src={assets.listIconColored}
                      alt="Booking"
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {booking.car.brand} {booking.car.model}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {booking.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    ${booking.price}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full shadow-sm ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No recent bookings</p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-3 flex flex-col justify-center items-center h-35 mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Revenue
          </h2>
          <p className="text-3xl font-bold text-green-600 shadow-sm px-3 py-1 rounded-lg bg-green-50">
            ${data.monthlyRevenue}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on confirmed bookings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
