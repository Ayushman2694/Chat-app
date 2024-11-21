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
app.use(cors({
    origin:'https://chat-app-frontend-0rup.onrender.com',
    credentials:true

}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

server.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
    connectDB();
})