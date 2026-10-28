const mongoose = require('mongoose')
const config = require('./config')

async function conectar() {
    try {
        await mongoose.connect(config.uri)
        console.log("MongoDB conectado")
    } catch (err) {
        console.error("Error de conexión a MongoDB:", err.message)
    }
}

module.exports = conectar