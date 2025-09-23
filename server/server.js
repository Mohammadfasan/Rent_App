import express from 'express';
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.get('/', (req, res) => {
    res.send("server is Running");
});

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});