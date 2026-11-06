const categoriaService = require('../Services/categoriaService')

exports.readCategorias = async (req, res) => {
  try {
    res.status(200).json(await categoriaService.getAllCategorias())
  } catch (error) {
    console.log("Error en el controller: - readCategorias - ", error)
    return res.status(500).json({ error: "Error interno del servidor" })
  }
}

exports.readCategoriaById = async (req, res) => {
  try {
    const id = req.params.id
    const categoria = await categoriaService.getCategoriaById(id)
    if (categoria.length === 0) {
      return res.status(404).send(`No se encuentra una categoría con el id: ${id}`)
    }
    res.status(200).json(categoria)
  } catch (error) {
    console.log("Error en el controller: - readCategoriaById - ", error)
    return res.status(500).json({ error: "Error interno del servidor" })
  }
}

exports.createCategoria = async (req, res) => {
  try {
    const categoriaNueva = req.body
    res.status(200).json(await categoriaService.createNewCategoria(categoriaNueva))
  } catch (error) {
    console.log("Error en el controller: - createCategoria - ", error)
    return res.status(500).json({ error: "Error interno del servidor al crear la categoría" })
  }
}

exports.updateCategoria = async (req, res) => {
  try {
    const id = req.params.id
    const categoriaActualizada = req.body
    const categoria = await categoriaService.updateCategoriaService(id, categoriaActualizada)
    if (categoria.length === 0) {
      return res.status(404).send(`No se encuentra una categoría a actualizar con el id: ${id}`)
    }
    res.status(200).json(categoria)
  } catch (error) {
    console.log("Error en el controller: - updateCategoria - ", error)
    return res.status(500).json({ error: "Error interno del servidor al actualizar la categoría" })
  }
}

exports.deleteCategoria = async (req, res) => {
  try {
    const id = req.params.id
    const categoria = await categoriaService.deleteCategoriaService(id)
    if (categoria.length === 0) {
      return res.status(404).send(`No se encuentra una categoría a eliminar con el id: ${id}`)
    }
    res.status(200).json(categoria)
  } catch (error) {
    console.log("Error en el controller: - deleteCategoria - ", error)
    return res.status(500).json({ error: "Error interno del servidor al eliminar la categoría" })
  }
}