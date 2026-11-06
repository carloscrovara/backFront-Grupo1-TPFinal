const express = require('express')
const autorController = require('../Controllers/autorController')

const autorRouter = express.Router()

autorRouter.get('/', autorController.readAutores)
autorRouter.get('/:id', autorController.readAutorById)
autorRouter.post('/', autorController.createAutor)
autorRouter.patch('/:id', autorController.updateAutor)
autorRouter.delete('/:id', autorController.deleteAutor)

module.exports = autorRouter