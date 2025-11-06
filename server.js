import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './config/DB.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
const PORT = 3000;  

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//Test database connection

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('🟢 Database connection established');
    connection.release();
  } catch (err) {
    console.error('🔴 Error connecting to the database:', err);
  }
})();


app.get('/', (req, res) => {
    res.send('Welcome to the Product Management API');
});


app.listen(PORT, () => {
    console.log(`🟢Server is running on http://localhost:${PORT}`);
});
