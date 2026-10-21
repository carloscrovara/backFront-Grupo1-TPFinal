const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1'
const PORT = 3000

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}`)
})