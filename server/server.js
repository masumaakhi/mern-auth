// //server.js

import express from "express";
import cors from "cors";
import 'dotenv/config';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from './routes/adminRoutes.js';
import session from "express-session";
// import passport from 'passport';
import passport from  './config/passport.js';
  




const app = express();
const port = process.env.PORT || 5250;
connectDB();

// const allowedOrigins = ['http://localhost:3000',
//                         "https://mern-auth-fronted.onrender.com"];


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-auth-fronted.onrender.com",
    credentials: true,
    methods: "GET", "POST", "PUT", "DELETE"
  })
);

dotenv.config();
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) =>  res.send('Api Working!'));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

// Passport(passport);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
