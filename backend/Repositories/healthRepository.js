const mongoose = require('mongoose')
const { getMongoDBConnection } = require('../database/conexion')

getMongoDBConnection()

exports.getDatabaseStatusRepository = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return "desconectada"
        }
        await mongoose.connection.db.admin().ping()
        return "conectada"
    } catch (error) {
        console.log("Error en el repository - getDatabaseStatusRepository - ", error)
        throw error
    }
}