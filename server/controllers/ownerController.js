import imagekit from "../configs/imagekit.js";
import User from "../models/Schema.js";
// import fs from 'fs'; // இந்த வரியை நீக்கவும்
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

// Controller to become owner - FIXED: Added export
export const changeOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list car" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to list Car
export const listCar = async (req, res) => {
  try {
    const { _id } = req.user;

    // Safe parse carData
    let car;
    if (typeof req.body.carData === "string") {
      car = JSON.parse(req.body.carData);
    } else {
      car = req.body.carData;
    }

    // Check if image exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
    const imageFile = req.file;

    // Upload image to Imagekit
    // fs.readFileSync() பதிலாக நேரடியாக imageFile.buffer-ஐ பயன்படுத்தவும்
    const response = await imagekit.upload({
      file: imageFile.buffer,
      fileName: imageFile.originalname,
      folder: "/cars"
    });

    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: 'auto' },
        { format: "webp" }
      ]
    });

    // Save car in DB
    const newCar = await Car.create({
      owner: _id,
      ...car,
      image: optimizedImageURL
    });

    res.json({ success: true, message: "Car listed successfully", data: newCar });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to List Owner Cars
export const ownerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log("ownerCars error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    
    if (!carId) {
      return res.status(400).json({ success: false, message: "carId is required" });
    }

    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    
    // Checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {   
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({ success: true, message: "Car availability toggled", car });
  } catch (error) {
    console.log("toggleCarAvailability error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    
    if (!carId) {
      return res.status(400).json({ success: false, message: "carId is required" });
    }

    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    
    // Checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {   
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    
    // Actually delete the car instead of just setting owner to null
    await Car.findByIdAndDelete(carId);
    
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.log("deleteCar error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
    try {
        const { _id, role } = req.user;
        
        if (role !== "owner") {
            return res.status(403).json({ 
                success: false, 
                message: "Access denied. Owner role required." 
            });
        }

        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate("car").sort({ createdAt: -1 });
        const completedBookings = await Booking.find({ owner: _id, status: "completed" });
        const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
        
        // Calculate total earnings from completed bookings
        const totalEarnings = completedBookings.reduce((acc, booking) => {
            return acc + (booking.price || 0);
        }, 0);
        
        // Calculate monthly revenue
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyRevenue = bookings.reduce((acc, booking) => {
            const bookingDate = new Date(booking.createdAt);
            if (booking.status === "confirmed" && 
                bookingDate.getMonth() === currentMonth && 
                bookingDate.getFullYear() === currentYear) {
                return acc + (booking.price || 0);
            }
            return acc;
        }, 0);

        res.status(200).json({
            success: true,
            data: {
                totalCars: cars.length,
                totalBookings: bookings.length,
                completedBookings: completedBookings.length,
                pendingBookings: pendingBookings.length,
                totalEarnings,
                monthlyRevenue,
                recentBookings: bookings.slice(0, 10)
            }
        });
        
    } catch (error) {
        console.error('Error in getDashboardStats:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// API to update user image - FIXED: Added file cleanup
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
    
    const imageFile = req.file;

    // Upload image to Imagekit
    // fs.readFileSync() பதிலாக நேரடியாக imageFile.buffer-ஐ பயன்படுத்தவும்
    const fileBuffer = imageFile.buffer;
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/user"
    });

    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: 'auto' },
        { format: "webp" }
      ]
    });
    
    const image = optimizedImageURL;
    await User.findByIdAndUpdate(_id, { image });
    
    res.json({ success: true, message: "Image updated successfully", image });

  } catch (error) {
    console.log("Update image error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};