const { getMongoDBConnection } = require('../database/conexion')
const Autor = require('./model/Autor.js')

getMongoDBConnection()

exports.getAllAutoresRepository = async () => {
    try {
        return await Autor.find()
    } catch (error) {
        throw error
    }
}

exports.getAutorByIdRepository = async (id) => {
    try {
        const autor = await Autor.findById(id)
        if (!autor) {
            return []
        }
        return autor
    } catch (error) {
        throw error
    }
}

exports.createNewAutorRepository = async (autorNuevo) => {
    try {
        const autor = new Autor(autorNuevo)
        await autor.save()
        return autor
    } catch (error) {
        throw error
    }
}

exports.updateAutorRepository = async (id, autorActualizado) => {
    try {
        const autor = await Autor.findByIdAndUpdate(id, autorActualizado, { new: true, runValidators: true })
        if (!autor) {
            return []
        }
        return autor
    } catch (error) {
        throw error
    }
}

exports.deleteAutorRepository = async (id) => {
    try {
        const autor = await Autor.findByIdAndDelete(id)
        if (!autor) {
            return []
        }
        return autor
    } catch (error) {
        throw error
    }
}
