const mongoose = require('mongoose')
const { configMongoDB } = require('./config')

const URI_MONGO_DB = configMongoDB.uri ||
    `mongodb+srv://${configMongoDB.user}:${configMongoDB.password}@${configMongoDB.app_name}.qrqk07e.mongodb.net/`

exports.getMongoDBConnection = async () => {
    try {
        if (mongoose.connection.readyState !== 0) return
        await mongoose.connect(URI_MONGO_DB, { dbName: 'recetario' })
        console.log("DB MongoDB conectada correctamente...")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
