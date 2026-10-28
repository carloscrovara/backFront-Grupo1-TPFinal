// Conecta a DB
const config = require('./config');

async function conectar() {
    try {
        console.log('DB conectada');
    } catch (err) {
        console.error('Error de conexión a db:', err.message);
    }
}

module.exports = conectar;