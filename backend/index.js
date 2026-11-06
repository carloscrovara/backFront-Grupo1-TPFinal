require('dotenv').config();
const express = require('express')
const cors = require('cors');

const healthRouter = require('./Routers/healthRouter');
const ingredienteRouter = require('./Routers/ingredienteRouter');
const categoriaRouter = require('./Routers/categoriaRouter');

const app = express()

const HOSTNAME = '127.0.0.1'
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

//Routers:
app.use('/api/health', healthRouter);
app.use('/api/ingredientes', ingredienteRouter);
app.use('/api/categorias', categoriaRouter);

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}`)
})