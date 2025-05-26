// //server.js

// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
// import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import adminRouter from './routes/adminRoutes.js';
// import session from "express-session";
// // import passport from 'passport';
// import passport from  './config/passport.js';
  




// const app = express();
// const port = process.env.PORT || 5250;
// connectDB();

// const allowedOrigins = ['http://localhost:3000',
//                         "https://mern-auth-fronted.onrender.com"];


// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://mern-auth-fronted.onrender.com",
//     credentials: true,
//   })
// );

// dotenv.config();
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) =>  res.send('Api Working!'));

// app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);

// // Passport(passport);



// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


import express from "express";
import cors from "cors";
import 'dotenv/config'; // Loads environment variables from .env file
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from './routes/adminRoutes.js';
import session from "express-session"; // Not directly used in the provided snippet, but kept
import passport from './config/passport.js'; // Assuming this correctly configures passport

const app = express();
const port = process.env.PORT || 5250;

// Connect to MongoDB
connectDB();

// Define allowed origins for CORS
const allowedOrigins = [
    'http://localhost:3000',
    '[https://mern-auth-fronted.onrender.com](https://mern-auth-fronted.onrender.com)'
];

// Configure CORS middleware
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            // Or if the origin is in our allowedOrigins list
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies to be sent with cross-origin requests
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Explicitly allow common HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
        optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Initialize Passport.js (ensure session middleware is before passport.session() if used)
// If you're using express-session, it should be configured before passport.session()
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'supersecretkey', // Use a strong secret from .env
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === 'production' } // Set secure to true in production
// }));
app.use(passport.initialize());
// app.use(passport.session()); // Uncomment if you are using Passport sessions

// Root route
app.get('/', (req, res) => res.send('Api Working!'));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
