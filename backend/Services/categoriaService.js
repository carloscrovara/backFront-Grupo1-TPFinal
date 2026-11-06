const categoriaRepository = require('../Repositories/categoriaRepository')

exports.getAllCategorias = async () => {
  try {
    return await categoriaRepository.getAllCategoriasRepository()
  } catch (error) {
    throw error
  }
}

exports.getCategoriaById = async (id) => {
  try {
    return await categoriaRepository.getCategoriaByIdRepository(id)
  } catch (error) {
    throw error
  }
}

exports.createNewCategoria = async (categoriaNueva) => {
  try {
    return await categoriaRepository.createNewCategoriaRepository(categoriaNueva)
  } catch (error) {
    throw error
  }
}

exports.updateCategoriaService = async (id, categoriaActualizada) => {
  try {
    return await categoriaRepository.updateCategoriaRepository(id,
      categoriaActualizada)
  } catch (error) {
    throw error
  }
}

exports.deleteCategoriaService = async (id) => {
  try {
    return await categoriaRepository.deleteCategoriaRepository(id)
  } catch (error) {
    throw error
  }
}