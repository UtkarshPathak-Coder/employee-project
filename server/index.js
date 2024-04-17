import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";

const app = express();

// Enable CORS for your frontend (adjust origin as needed)
app.use(cors({
    origin: true,

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// Your existing routes
app.use("/auth", adminRouter);

app.listen(3000, () => {
    console.log("Server running");
});
