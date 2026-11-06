const recetaRepository = require('../Repositories/recetaRepository')

exports.getAllRecetas = async () => {
    try {
        return await recetaRepository.getAllRecetasRepository()
    } catch (error) {
        throw error
    }
}

exports.getRecetaById = async (id) => {
    try {
        return await recetaRepository.getRecetaByIdRepository(id)
    } catch (error) {
        throw error
    }
}

exports.createNewReceta = async (recetaNueva) => {
    try {
        return await recetaRepository.createNewRecetaRepository(recetaNueva)
    } catch (error) {
        throw error
    }
}

exports.updateRecetaService = async (id, recetaActualizada) => {
    try {
        return await recetaRepository.updateRecetaRepository(id, recetaActualizada)
    } catch (error) {
        throw error
    }
}

exports.deleteRecetaService = async (id) => {
    try {
        return await recetaRepository.deleteRecetaRepository(id)
    } catch (error) {
        throw error
    }
}