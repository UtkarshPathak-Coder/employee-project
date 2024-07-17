import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { EventHubProducerClient } from "@azure/event-hubs"
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

const connectionString = process.env.conn_string;
const eventHubName = "server-runnig";
const producer = new EventHubProducerClient(connectionString, eventHubName);

// Function to send a message to Event Hub
const sendMessageToEventHub = async (message) => {
    try {
        const batch = await producer.createBatch();
        batch.tryAdd({ body: message });
        await producer.sendBatch(batch);
        console.log("Message sent to Event Hub:", message);
    } catch (error) {
        console.error("Failed to send message to Event Hub:", error);
    }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (async () => {
        console.log("Sending log message to Event Hub...");
        await sendMessageToEventHub(`Server running on port ${PORT}`);
    })();
});
export default sendMessageToEventHub;