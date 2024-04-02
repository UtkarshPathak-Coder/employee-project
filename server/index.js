import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";

const app = express();

// Enable CORS for your frontend (adjust origin as needed)
app.use(cors({
    origin: ["http://localhost:5173","http://localhost","http://172.19.192.1:5173","http://10.16.2.95:5173"], // Change this to the actual origin of your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// Your existing routes
app.use("/auth", adminRouter);

app.listen(3000, () => {
    console.log("Server running");
});
