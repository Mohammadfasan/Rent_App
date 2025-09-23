import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    checkBookingAvailability,
    createBooking,
    getUserBookings,
    getOwnerBookings,
    changeBookingStatus,
    deleteBooking // Add this import
} from '../controllers/bookingContoller.js'; // Note: Correct filename

const router = express.Router();

router.post('/check-availability', checkBookingAvailability);
router.post('/create', protect, createBooking);
router.get('/user-bookings', protect, getUserBookings);
router.get('/owner-bookings', protect, getOwnerBookings);
router.put('/status', protect, changeBookingStatus);
router.delete('/delete', protect, deleteBooking); // Add this route

export default router;