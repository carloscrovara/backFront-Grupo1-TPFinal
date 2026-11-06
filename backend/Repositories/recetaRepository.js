const { getMongoDBConnection } = require('../database/conexion')
const Receta = require('./model/Receta.js')

getMongoDBConnection()

exports.getAllRecetasRepository = async () => {
    try {
        return await Receta.find().populate(['ingredientes', 'autor', 'categoria'])
    } catch (error) {
        throw error
    }
}

exports.getRecetaByIdRepository = async (id) => {
    try {
        const receta = await Receta.findById(id).populate(['ingredientes', 'autor', 'categoria'])
        if (!receta) {
            return []
        }
        return receta
    } catch (error) {
        throw error
    }
}

exports.createNewRecetaRepository = async (recetaNueva) => {
    try {
        const receta = new Receta(recetaNueva)
        await receta.save()
        return receta
    } catch (error) {
        throw error
    }
}

exports.updateRecetaRepository = async (id, recetaActualizada) => {
    try {
        const receta = await Receta.findByIdAndUpdate(id, recetaActualizada, { new: true, runValidators: true })
        if (!receta) {
            return []
        }
        return receta
    } catch (error) {
        throw error
    }
}

exports.deleteRecetaRepository = async (id) => {
    try {
        const receta = await Receta.findByIdAndDelete(id)
        if (!receta) {
            return []
        }
        return receta
    } catch (error) {
        throw error
    }
}