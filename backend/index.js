import express from "express";
import { mongoDbURL, PORT } from "./config.js";
import mongoose from 'mongoose';
import todosRoute from "./routes/todosRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome')
});

app.use('/api/todos', todosRoute);

mongoose.connect(mongoDbURL)
    .then(()=> {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) =>{
        console.log(error);
    });