const menuService = require('../Services/menuService')

exports.readMenus = async (req, res) => {
    try {
        res.status(200).json(await menuService.getAllMenus())
    } catch (error) {
        console.log("Error en el controller: - readMenus - ", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

exports.readMenuById = async (req, res) => {
    try {
        const id = req.params.id
        const menu = await menuService.getMenuById(id)

        if (menu.length === 0) {
            return res.status(404).send(`No se encuentra un menú con el id: ${id}`)
        }

        res.status(200).json(menu)
    } catch (error) {
        console.log("Error en el controller: - readMenuById - ", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

exports.createMenu = async (req, res) => {
    try {
        const menuNuevo = req.body
        res.status(200).json(await menuService.createNewMenu(menuNuevo))
    } catch (error) {
        console.log("Error en el controller: - createMenu - ", error)
        return res.status(500).json({ error: "Error interno del servidor al crear el menú" })
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const id = req.params.id
        const menuActualizado = req.body

        const menu = await menuService.updateMenuService(id, menuActualizado)

        if (menu.length === 0) {
            return res.status(404).send(`No se encuentra un menú a actualizar con el id: ${id}`)
        }

        res.status(200).json(menu)
    } catch (error) {
        console.log("Error en el controller: - updateMenu - ", error)
        return res.status(500).json({ error: "Error interno del servidor al actualizar el menú" })
    }
}

exports.deleteMenu = async (req, res) => {
    try {
        const id = req.params.id
        const menu = await menuService.deleteMenuService(id)

        if (menu.length === 0) {
            return res.status(404).send(`No se encuentra un menú a eliminar con el id: ${id}`)
        }

        res.status(200).json(menu)
    } catch (error) {
        console.log("Error en el controller: - deleteMenu - ", error)
        return res.status(500).json({ error: "Error interno del servidor al eliminar el menú" })
    }
}
