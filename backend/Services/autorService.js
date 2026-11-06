const autorRepository = require('../Repositories/autorRepository')

exports.getAllAutores = async () => {
    try {
        return await autorRepository.getAllAutoresRepository()
    } catch (error) {
        throw error
    }
}

exports.getAutorById = async (id) => {
    try {
        return await autorRepository.getAutorByIdRepository(id)
    } catch (error) {
        throw error
    }
}

exports.createNewAutor = async (autorNuevo) => {
    try {
        return await autorRepository.createNewAutorRepository(autorNuevo)
    } catch (error) {
        throw error
    }
}

exports.updateAutorService = async (id, autorActualizado) => {
    try {
        return await autorRepository.updateAutorRepository(id, autorActualizado)
    } catch (error) {
        throw error
    }
}

exports.deleteAutorService = async (id) => {
    try {
        return await autorRepository.deleteAutorRepository(id)
    } catch (error) {
        throw error
    }
}
