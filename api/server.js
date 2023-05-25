// MAIN SERCVER FILE

import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

// ROUTES
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";




const app = express()


// so we can setup our environment variable in monoose and express
dotenv.config();

// setting up the mongoose
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect to mongodb");
    } catch (error) {
        console.log(`${error} did not connect`);
    }

};


// MIDDLEWARE
//cors and express to allow to take input from client side ur
// we need credential as we are sending cookies from client to backend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(cookieParser());



// using the  middleware for routes : making endpoint in routes folder
// we created in server js because it can be used from anywhere in api folder
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// our own error handling middleware
// error middleware should be kept at last of middleware , so you dont see weird text along with error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});





// local host for sever to run
app.listen(8800, () => {
    {
        connect();
        console.log("backend running");

       
    }
});



