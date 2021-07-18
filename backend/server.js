import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
dotenv.config();
app.use(express.json({ limit: '30mb', extended: 'true' }));
app.use(express.urlencoded({ limit: '30mb', extended: 'true' }));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose Connected');
        app.listen(process.env.PORT, () => {
            console.log(`server running on Port ${process.env.PORT}`);

        })
    }).catch((err) => {
        console.log('error in mongoose connection');
        console.log(err);
    })
