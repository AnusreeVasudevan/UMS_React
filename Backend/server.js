import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/MEARN");

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000;

// Set up __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's origin
  credentials: true, // Allow credentials (cookies)
}));

// Import routers
import userRouter from './router/userRoutes.js';
import adminRouter from './router/adminRouter.js';

// Use routers
app.use('/api/users', userRouter);
app.use('/admin', adminRouter);

// Serve static files from the React app's dist directory
app.use(express.static(path.join(__dirname, '../Frontend/dist')));
// app.use(express.static(path.join(__dirname, '../Frontend/public')));

// For any other request, send the React app's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
