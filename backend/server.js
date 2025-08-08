import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import authRoutes from './routes/authRoutes.js';
import hijabRoutes from './routes/style.js'; 
import reviewRoutes from './routes/review.js'

import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.Frontend_URL , credentials: true }));
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/hijabs', hijabRoutes);
app.use('/api/reviews', reviewRoutes);


app.get("/", (req, res)=> res.send('Hello') )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
