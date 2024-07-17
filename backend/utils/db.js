import pg from 'pg'
import dotenv from "dotenv";
import sendMessageToEventHub from '../index.js';
dotenv.config();
const {Pool}=pg;
 
// Create a connection pool
    const pool = new Pool({
     user:process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: 5432, // Default PostgreSQL port
});
 
// Check if the connection is successful
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
        (async () => {
            console.log("Sending log message to Event Hub...");
            await sendMessageToEventHub(`Connected to the database!`);
        })();
    }
});
 
export default pool;
