const menuRepository = require('../Repositories/menuRepository')

exports.getAllMenus = async () => {
    try {
        return await menuRepository.getAllMenusRepository()
    } catch (error) {
        throw error
    }
}

exports.getMenuById = async (id) => {
    try {
        return await menuRepository.getMenuByIdRepository(id)
    } catch (error) {
        throw error
    }
}

exports.createNewMenu = async (menuNuevo) => {
    try {
        return await menuRepository.createNewMenuRepository(menuNuevo)
    } catch (error) {
        throw error
    }
}

exports.updateMenuService = async (id, menuActualizado) => {
    try {
        return await menuRepository.updateMenuRepository(id, menuActualizado)
    } catch (error) {
        throw error
    }
}

exports.deleteMenuService = async (id) => {
    try {
        return await menuRepository.deleteMenuRepository(id)
    } catch (error) {
        throw error
    }
}
