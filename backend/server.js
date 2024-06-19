import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import connectDB from './db/MongoDB.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Server is Ready')
})

app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
    connectDB();
})