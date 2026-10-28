const healthService = require('../Services/healthService');

exports.check = async (req, res) => {
	try {
		const estado = await healthService.getStatus()
        if (estado === undefined) {
            return res.status(500).json({ error: "Error interno del servidor" })
        }
        res.status(200).json(estado) 
    }catch (error) {
        console.log("Error en el controller: - check - ", error)
        res.status(500).json({ error: "Error interno del servidor" }) 
    }
}