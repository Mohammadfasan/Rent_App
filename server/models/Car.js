import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;   // Capital “O” is the standard

const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User", required: true }, // add required if you always need an owner
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },          // use Number for prices
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },          // spelling + optional default
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
