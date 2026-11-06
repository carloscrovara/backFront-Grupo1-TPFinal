const express = require('express')
const recetaController = require('../Controllers/recetaController')

const recetaRouter = express.Router()

recetaRouter.get('/', recetaController.readRecetas)
recetaRouter.get('/:id', recetaController.readRecetaById)
recetaRouter.post('/', recetaController.createReceta)
recetaRouter.patch('/:id', recetaController.updateReceta)
recetaRouter.delete('/:id', recetaController.deleteReceta)

module.exports = recetaRouter