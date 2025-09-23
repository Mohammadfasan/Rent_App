// ownerRoutes.js - Make sure it matches this
import { protect } from "../middleware/auth.js";
import { 
  deleteCar, 
  ownerCars, 
  toggleCarAvailability,
  getDashboardStats,
  listCar,
  updateUserImage,
  changeOwner // This should now work
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import express from "express";

const ownerRoute = express.Router();

ownerRoute.post("/change-owner", protect, changeOwner);
ownerRoute.post("/add-car", protect, upload.single("image"), listCar);
ownerRoute.get("/cars", protect, ownerCars); // Changed to GET
ownerRoute.post("/toggle-car", protect, toggleCarAvailability);
ownerRoute.post("/delete-car", protect, deleteCar);
ownerRoute.get("/dashboard", protect, getDashboardStats);
ownerRoute.post("/update-image", protect, upload.single("image"), updateUserImage);

export default ownerRoute;