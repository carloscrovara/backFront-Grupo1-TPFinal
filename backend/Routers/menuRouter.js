const express = require('express')
const menuController = require('../Controllers/menuController')

const menuRouter = express.Router()

menuRouter.get('/', menuController.readMenus)
menuRouter.get('/:id', menuController.readMenuById)
menuRouter.post('/', menuController.createMenu)
menuRouter.patch('/:id', menuController.updateMenu)
menuRouter.delete('/:id', menuController.deleteMenu)

module.exports = menuRouter
