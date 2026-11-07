const { getMongoDBConnection } = require('../database/conexion')
const Menu = require('./model/Menu.js')

getMongoDBConnection()

exports.getAllMenusRepository = async () => {
    try {
        return await Menu.find().populate('recetas')
    } catch (error) {
        throw error
    }
}

exports.getMenuByIdRepository = async (id) => {
    try {
        const menu = await Menu.findById(id).populate('recetas')
        if (!menu) {
            return []
        }
        return menu
    } catch (error) {
        throw error
    }
}

exports.createNewMenuRepository = async (menuNuevo) => {
    try {
        const menu = new Menu(menuNuevo)
        await menu.save()
        return menu
    } catch (error) {
        throw error
    }
}

exports.updateMenuRepository = async (id, menuActualizado) => {
    try {
        const menu = await Menu.findByIdAndUpdate(id, menuActualizado, { new: true, runValidators: true })
        if (!menu) {
            return []
        }
        return menu
    } catch (error) {
        throw error
    }
}

exports.deleteMenuRepository = async (id) => {
    try {
        const menu = await Menu.findByIdAndDelete(id)
        if (!menu) {
            return []
        }
        return menu
    } catch (error) {
        throw error
    }
}
