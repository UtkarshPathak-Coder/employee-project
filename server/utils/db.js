import pg from 'pg'
const {Pool}=pg;
 
// Create a connection pool
    const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employeedb',
    password: '12345',
    port: 5432, // Default PostgreSQL port
});
 
// Check if the connection is successful
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});
 
export default pool;