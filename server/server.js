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

// Connect to database first, then start server
const startServer = async () => {
    try {
        await connectDB();
        
        app.get('/', (req, res) => {
            res.send("Server is Running");
        });

        app.use('/api/user', userRouter);
        app.use('/api/owner', ownerRouter);
        app.use('/api/booking', bookingRouter);
        
        const PORT = process.env.PORT || 3000;
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;