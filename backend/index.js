import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Enable CORS for your frontend (adjust origin as needed)
app.use(cors({
    origin: true,

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Your existing routes
app.use("/auth", adminRouter);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
