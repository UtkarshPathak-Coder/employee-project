import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { EventHubProducerClient , EventHubConsumerClient ,latestEventPosition, earliestEventPosition} from "@azure/event-hubs"
import { ServiceBusClient } from "@azure/service-bus";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";

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
const storageConnectionString = process.env.STORAGE_CONNECTION_STRING;
const containerName = process.env.containerName;






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
    
    const containerClient = new ContainerClient(storageConnectionString, containerName);
    const checkpointStore = new BlobCheckpointStore(containerClient);

    
    const consumerClient = new EventHubConsumerClient(consumerGroupName, connectionString, eventHubName, checkpointStore);

    const subscription = consumerClient.subscribe({
        processEvents: async (events, context) => {
            if (events.length === 0) {
                console.log(`No events received within wait time. Waiting for next interval`);
                return;
            }

            for (const event of events) {
                console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
                fs.appendFile('eventLogs.txt', `${new Date().toISOString()} - ${event.body}\n`, (err) => {
                    if (err) {
                        console.error('Failed to write event to event log file:', err);
                    } else {
                        console.log('Event logged to event log file');
                    }
                });
            }

           
            await context.updateCheckpoint(events[events.length - 1]);
        },
        processError: async (err, context) => {
            console.log(`Error occurred: ${err}`);
        }
    }, { startPosition: latestEventPosition });

    console.log(`Listening for events on ${eventHubName} with consumer group ${consumerGroupName}`);

    // Wait for 1-2 minutes before stopping
    await new Promise((resolve) => {
        setTimeout(async () => {
            await subscription.close();
            await consumerClient.close();
            resolve();
        }, 2 * 60 * 1000); // 2 minutes
    });
};


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (async () => {
        console.log("Sending log message to Event Hub...");
        await sendMessageToEventHub(`Server running on port ${PORT}`);
        console.log("Sending log message to Service Bus Queue...");
        await sendMessageToServiceBusQueue(`Server running on port ${PORT}`);
        await receiveMessagesFromServiceBusQueue();
        await receiveMessagesFromEventHub();
        
    })();
    
});

export default sendMessageToServiceBusQueue;