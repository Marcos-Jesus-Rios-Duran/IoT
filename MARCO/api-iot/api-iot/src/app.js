import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'socket.io';
import morgan from "morgan";

import http from 'http';
import './db/db.js';
import sensorActuador from './models/sensorSchema.js';
import { swaggerOptions } from "./swagger/swaggerOptions.js";
import sensorRoutes from './routes/sensors.js'
dotenv.config();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on("nuevoDato", async (data) => {
        try {
            const nuevoRegistro = new sensorActuador(data);
            await nuevoRegistro.save();
            io.emit("datosActualizados", nuevoRegistro);
        } catch (error) {
            console.error("Error al guardar el nuevo dato:", error);
        }
    });
});

app.use(cors());
app.use(express.json());

// Configura Swagger UI
app.use(sensorRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
export default app;