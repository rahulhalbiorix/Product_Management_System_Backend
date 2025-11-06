import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Add this after dotenv.config();
console.log('Database Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.PORT
});


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.PORT || 3306,
});

export default pool;