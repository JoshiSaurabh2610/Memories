import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '30mb', extended: 'true' }));
app.use(express.urlencoded({ limit: '30mb', extended: 'true' }));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose Connected');

        app.use('/api/auth', authRouter);

        // app.use(ErrorHandler);
        app.listen(process.env.PORT, () => {
            console.log(`server running on Port ${process.env.PORT}`);

        });
    }).catch((err) => {
        console.log('error in mongoose connection');
        console.log(err);
    })
