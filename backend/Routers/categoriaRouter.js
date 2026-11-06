const express = require('express')
const categoriaController = require('../Controllers/categoriaController')

const categoriaRouter = express.Router()

categoriaRouter.get('/', categoriaController.readCategorias)
categoriaRouter.get('/:id', categoriaController.readCategoriaById)
categoriaRouter.post('/', categoriaController.createCategoria)
categoriaRouter.patch('/:id', categoriaController.updateCategoria)
categoriaRouter.delete('/:id', categoriaController.deleteCategoria)

module.exports = categoriaRouter