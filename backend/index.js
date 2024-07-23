import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { EventHubProducerClient , EventHubConsumerClient } from "@azure/event-hubs"
import { ServiceBusClient } from "@azure/service-bus";
import fs from 'fs';
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
const eventHubName = "server-running";
const consumerGroupName = "utkarsh-consumer-group";
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

const sendMessageToServiceBusQueue = async (message) => {
    try {
        const serviceBusMessage = { body: message };
        await sender.sendMessages(serviceBusMessage);
        console.log("Message sent to Service Bus Queue:", message);
    } catch (error) {
        console.error("Failed to send message to Service Bus Queue:", error);
    }
};

const svcbusconnstring= process.env.svc_conn_string;
const queuename="utk-svc-queue";
const servicebusclient=new ServiceBusClient(svcbusconnstring);
const sender= servicebusclient.createSender(queuename);
const receiveMessagesFromServiceBusQueue = async () => {
    const receiver = servicebusclient.createReceiver(queuename);
    const messageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`);
        
        // Log the message to a file
        fs.appendFile('messageLogs.txt', `${new Date().toISOString()} - ${messageReceived.body}\n`, (err) => {
            if (err) {
                console.error('Failed to write message to log file:', err);
            } else {
                console.log('Message logged to file');
            }
        });

        await receiver.completeMessage(messageReceived);
    };

    const errorHandler = async (error) => {
        console.error(`Error occurred: ${error}`);
    };

    receiver.subscribe({
        processMessage: messageHandler,
        processError: errorHandler
    });

    console.log(`Listening for messages on ${queuename}`);
};

const receiveMessagesFromEventHub = async () => {
    const consumerClient = new EventHubConsumerClient(consumerGroupName, connectionString, eventHubName);

    const messageHandler = async (event) => {
        console.log(`Received event: ${event.body}`);
        
        // Log the event to a file
        fs.appendFile('eventLogs.txt', `${new Date().toISOString()} - ${event.body}\n`, (err) => {
            if (err) {
                console.error('Failed to write event to log file:', err);
            } else {
                console.log('Event logged to file');
            }
        });
    };

    const errorHandler = (error) => {
        console.error(`Error occurred: ${error}`);
    };

    consumerClient.subscribe({
        processEvents: messageHandler,
        processError: errorHandler
    });

    console.log(`Listening for events on ${eventHubName} with consumer group ${consumerGroupName}`);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (async () => {
        console.log("Sending log message to Event Hub...");
        await sendMessageToEventHub(`Server running on port ${PORT}`);
        console.log("Sending log message to Service Bus Queue...");
        await sendMessageToServiceBusQueue(`Server running on port ${PORT}`);
        console.log("\n\nREceiving log message to Service Bus Queue...");
        await receiveMessagesFromServiceBusQueue();
        console.log("\nReceiving message from event hub")
        await receiveMessagesFromEventHub();
    })();
    
});

export default sendMessageToServiceBusQueue;
