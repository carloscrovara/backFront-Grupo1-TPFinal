const dotenv = require('dotenv')

dotenv.config()

const configMongoDB = {
    user: process.env.USER_DB_MONGO,
    password: process.env.PASSWORD_DB_MONGO,
    app_name: process.env.APP_NAME_MONGO,
    uri: process.env.MONGODB_URI
}

module.exports = { configMongoDB }