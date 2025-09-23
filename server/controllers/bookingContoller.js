import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

// Function to check availability of car for given dates
const checkAvailability = async (carId, pickupDate, returnDate) => {
    try {
        const bookings = await Booking.find({
            car: carId,
            pickupDate: { $lte: returnDate },
            returnDate: { $gte: pickupDate },
            status: { $ne: 'cancelled' } // Exclude cancelled bookings
        });
        return bookings.length === 0;
    } catch (error) {
        console.error('Error checking availability:', error.message);
        return false;
    }
};

// API to Check Availability of Cars for given dates
export const checkBookingAvailability = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;
        
        // Validate required fields
        if (!location || !pickupDate || !returnDate) {
            return res.status(400).json({ 
                success: false, 
                message: 'Location, pickupDate, and returnDate are required' 
            });
        }

        // Validate dates
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        
        if (isNaN(pickup.getTime()) || isNaN(returnD.getTime())) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid date format' 
            });
        }

        if (pickup >= returnD) {
            return res.status(400).json({ 
                success: false, 
                message: 'Return date must be after pickup date' 
            });
        }

        const cars = await Car.find({ location, isAvailable: true });
        
        const availabilityPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(
                car._id, 
                pickup, 
                returnD
            );
            
            return {
                ...car.toObject(),
                isAvailable
            };
        });

        const availableCars = await Promise.all(availabilityPromises);
        const filteredCars = availableCars.filter(car => car.isAvailable === true);

        res.status(200).json({ 
            success: true, 
            data: filteredCars,
            count: filteredCars.length
        });
        
    } catch (error) {
        console.error('Error in checkBookingAvailability:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};

// API to create booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;

        // Convert dates to Date objects
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);

        const isAvailable = await checkAvailability(car, pickup, returnD);
        if (!isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Car not available for selected dates"
            });
        }

        const carData = await Car.findById(car);
        if (!carData) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        const noOfDays = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
        const price = noOfDays * carData.pricePerDay;

        const booking = await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate: pickup,
            returnDate: returnD,
            price,
            status: 'pending'
        });

        // Populate the created booking
        const populatedBooking = await Booking.findById(booking._id)
            .populate('car')
            .populate('user', '-password');

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: populatedBooking
        });
    } catch (error) {
        console.error('Error in createBooking:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// API to List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id })
            .populate("car")
            .populate("owner", "name email")
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error('Error in getUserBookings:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// API to List Owner Bookings
export const getOwnerBookings = async (req, res) => {
    try { 
        if (req.user.role !== "owner") {
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized: Owner access required" 
            });
        }
        
        const bookings = await Booking.find({ owner: req.user._id })
            .populate("car")
            .populate("user", "-password")
            .sort({ createdAt: -1 });
            
        res.status(200).json({
            success: true,
            bookings
        });
        
    } catch (error) {
        console.error('Error in getOwnerBookings:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// API to Update Booking Status
export const changeBookingStatus = async (req, res) => {
    try { 
        const { _id, role } = req.user;
        const { bookingId, status } = req.body;
        
        // Validate status
        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user is owner of the car or admin
        if (booking.owner.toString() !== _id.toString() && role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized" 
            });
        }

        booking.status = status;
        await booking.save();

        // Populate the updated booking
        const updatedBooking = await Booking.findById(bookingId)
            .populate('car')
            .populate('user', '-password');

        res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            data: updatedBooking
        });
    } catch (error) {
        console.error('Error in changeBookingStatus:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// API to Delete Booking
export const deleteBooking = async (req, res) => {
    try { 
        const { _id, role } = req.user;
        const { bookingId } = req.body;
        
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user is owner of the car, the user who made the booking, or admin
        const isOwner = booking.owner.toString() === _id.toString();
        const isUser = booking.user.toString() === _id.toString();
        const isAdmin = role === 'admin';
        
        if (!isOwner && !isUser && !isAdmin) {
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized" 
            });
        }

        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });
    } catch (error) {
        console.error('Error in deleteBooking:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};