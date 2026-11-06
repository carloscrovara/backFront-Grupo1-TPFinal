const recetaService = require('../Services/recetaService')

exports.readRecetas = async (req, res) => {
    try {
        res.status(200).json(await recetaService.getAllRecetas())
    } catch (error) {
        console.log("Error en el controller: - readRecetas - ", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

exports.readRecetaById = async (req, res) => {
    try {
        const id = req.params.id
        const receta = await recetaService.getRecetaById(id)

        if (receta.length === 0) {
            return res.status(404).send(`No se encuentra una receta con el id: ${id}`)
        }

        res.status(200).json(receta)
    } catch (error) {
        console.log("Error en el controller: - readRecetaById - ", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

exports.createReceta = async (req, res) => {
    try {
        const recetaNueva = req.body
        res.status(200).json(await recetaService.createNewReceta(recetaNueva))
    } catch (error) {
        console.log("Error en el controller: - createReceta - ", error)
        return res.status(500).json({ error: "Error interno del servidor al crear la receta" })
    }
}

exports.updateReceta = async (req, res) => {
    try {
        const id = req.params.id
        const recetaActualizada = req.body

        const receta = await recetaService.updateRecetaService(id, recetaActualizada)

        if (receta.length === 0) {
            return res.status(404).send(`No se encuentra una receta a actualizar con el id: ${id}`)
        }

        res.status(200).json(receta)
    } catch (error) {
        console.log("Error en el controller: - updateReceta - ", error)
        return res.status(500).json({ error: "Error interno del servidor al actualizar la receta" })
    }
}

exports.deleteReceta = async (req, res) => {
    try {
        const id = req.params.id
        const receta = await recetaService.deleteRecetaService(id)

        if (receta.length === 0) {
            return res.status(404).send(`No se encuentra una receta a eliminar con el id: ${id}`)
        }

        res.status(200).json(receta)
    } catch (error) {
        console.log("Error en el controller: - deleteReceta - ", error)
        return res.status(500).json({ error: "Error interno del servidor al eliminar la receta" })
    }
}