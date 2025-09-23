import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/booking/owner-bookings');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.put('/api/booking/status', { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Add delete booking function
  const deleteBooking = async (bookingId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this booking?")) {
        return;
      }
      
      const { data } = await axios.delete('/api/booking/delete', { 
        data: { bookingId } 
      });
      
      if (data.success) {
        toast.success(data.message);
        // Remove the deleted booking from state
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="px-4 pt-10 md:px-10 w-full">
        <Title title="Manage Bookings" subTitle="View and manage your bookings" />
        <div className="p-4 text-center">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Bookings" subTitle="View and manage your bookings" />

      <div className="w-full overflow-hidden mt-10 rounded-lg border border-borderColor">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left bg-gray-800">
              <th className="p-4 border-b">Car</th>
              <th className="p-4 border-b">Pickup Date</th>
              <th className="p-4 border-b">Return Date</th>
              <th className="p-4 border-b">Price</th>
              <th className="p-4 border-b text-center max-md:hidden">Status</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-900">
                  <td className="p-4 border-b flex items-center gap-3">
                    <img
                      src={booking.car?.image}
                      alt={booking.car?.model}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-800">
                      {booking.car?.brand} {booking.car?.model}
                    </span>
                  </td>

                  <td className="p-4 border-b">
                    {new Date(booking.pickupDate).toLocaleDateString()}
                  </td>

                  <td className="p-4 border-b">
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </td>

                  <td className="p-4 border-b font-semibold text-white">
                    ${booking.price}
                  </td>

                  <td className="p-4 border-b text-center max-md:hidden">
                    <select
                      value={booking.status}
                      onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? "bg-green-100 text-green-600" 
                          : booking.status === 'pending'
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>

                  <td className="p-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => changeBookingStatus(booking._id, 'confirmed')}
                        className="p-1  rounded hover:bg-green-200 transition"
                        title="Confirm Booking"
                      >
                        <img
                          src={assets.edit_icon}
                          alt="confirm"
                          className="w-7 h-7"
                        />
                      </button>
                      <button
                        onClick={() => deleteBooking(booking._id)} // Changed to call deleteBooking
                        className="p-1  rounded hover:text-red-200 transition"
                        title="Delete Booking"
                      >
                        <img
                          src={assets.delete_icon}
                          alt="delete"
                          className="w-9 h-9 filter invert brightness-0 "
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No bookings found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;