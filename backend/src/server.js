import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectDB }from "./database/db.js";
import {io,server,app} from "./utils/socket.js"

dotenv.config()


const port = 4500 || process.env.PORT
app.use(express.json({ limit: '50mb' })); // For JSON requests
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For form submissions

app.use(cookieParser())

const allowedOrigins = [
  'https://convohub-ayushman.netlify.app', // Allow Netlify domain
  'http://localhost:3000', // Allow local development (if needed)
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

server.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
    connectDB();
})
