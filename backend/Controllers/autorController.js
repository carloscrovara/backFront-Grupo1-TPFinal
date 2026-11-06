const autorService = require('../Services/autorService')

exports.readAutores = async (req, res) => {
    try {
        res.status(200).json(await autorService.getAllAutores())
    } catch (error) {
        console.log("Error en el controller: - readAutores - ", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

exports.readAutorById = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await autorService.getAutorById(id)

        if (autor.length === 0) {
            return res.status(404).send(`No se encuentra un autor con el id: ${id}`)
        }

        res.status(200).json(autor)
    } catch (error) {
        console.log("Error en el controller: - readAutorById - ", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

exports.createAutor = async (req, res) => {
    try {
        const autorNuevo = req.body
        res.status(200).json(await autorService.createNewAutor(autorNuevo))
    } catch (error) {
        console.log("Error en el controller: - createAutor - ", error)
        return res.status(500).json({ error: "Error interno del servidor al crear el autor" })
    }
}

exports.updateAutor = async (req, res) => {
    try {
        const id = req.params.id
        const autorActualizado = req.body

        const autor = await autorService.updateAutorService(id, autorActualizado)

        if (autor.length === 0) {
            return res.status(404).send(`No se encuentra un autor a actualizar con el id: ${id}`)
        }

        res.status(200).json(autor)
    } catch (error) {
        console.log("Error en el controller: - updateAutor - ", error)
        return res.status(500).json({ error: "Error interno del servidor al actualizar el autor" })
    }
}

exports.deleteAutor = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await autorService.deleteAutorService(id)

        if (autor.length === 0) {
            return res.status(404).send(`No se encuentra un autor a eliminar con el id: ${id}`)
        }

        res.status(200).json(autor)
    } catch (error) {
        console.log("Error en el controller: - deleteAutor - ", error)
        return res.status(500).json({ error: "Error interno del servidor al eliminar el autor" })
    }
}
