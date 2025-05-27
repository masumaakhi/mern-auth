//server.js

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

const allowedOrigins = ['http://localhost:3000',
                        "https://mern-auth-fronted.onrender.com",
                        "https://mern-auth-backend-thu0.onrender.com",
                        "http://localhost:5250"];  


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);
app.use(session ({
  secret: process.env.COOKIE_KEY || 'defaultSecret' ,
  resave: false,
  saveUninitialized: false
}))

dotenv.config();
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) =>  res.send('Api Working!'));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

// Passport(passport);

const server = "https://mern-auth-backend-thu0.onrender.com"

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.listen(server, () => {
  console.log(`server running ${server}`);
})
