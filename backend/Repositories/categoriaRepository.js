const { getMongoDBConnection } = require('../database/conexion')
const Categoria = require('./model/Categoria.js')

getMongoDBConnection()

exports.getAllCategoriasRepository = async () => {
  try {
    return await Categoria.find()
  } catch (error) {
    throw error
  }
}

exports.getCategoriaByIdRepository = async (id) => {
  try {
    const categoria = await Categoria.findById(id)
    if (!categoria) {
      return []
    }
    return categoria
  } catch (error) {
    throw error
  }
}

exports.createNewCategoriaRepository = async (categoriaNueva) => {
  try {
    const categoria = new Categoria(categoriaNueva)
    await categoria.save()
    return categoria
  } catch (error) {
    throw error
  }
}

exports.updateCategoriaRepository = async (id, categoriaActualizada) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(id, categoriaActualizada,
      { new: true, runValidators: true })
    if (!categoria) {
      return []
    }
    return categoria
  } catch (error) {
    throw error
  }
}

exports.deleteCategoriaRepository = async (id) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(id)
    if (!categoria) {
      return []
    }
    return categoria
  } catch (error) {
    throw error
  }
}