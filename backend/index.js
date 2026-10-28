require('dotenv').config();
const express = require('express')
const cors = require('cors');
const conectar = require('./database/conexion')

const healthRouter = require('./Routers/healthRouter');

const app = express()

const HOSTNAME = '127.0.0.1'
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

//Routers:
app.use('/api/health', healthRouter);

conectar().then(() => {
    app.listen(PORT, HOSTNAME, () => {
        console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}`)
    })
})