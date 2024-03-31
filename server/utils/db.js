import pg from 'pg'
const {Pool}=pg;
 
// Create a connection pool
    const pool = new Pool({
    user: 'utkarshp',
    host: 'dpg-co2g47ol6cac73bn1lhg-a.oregon-postgres.render.com',
    database: 'employeedb_ppp1',
    password: 'parsHDupSQDVRxYTNJnG3lGfOOQeoN8k',
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