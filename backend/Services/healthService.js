const healthRepository = require('../Repositories/healthRepository')

exports.getStatus = async () => {
    try {
        const database = await healthRepository.getDatabaseStatusRepository()
        if (database !== "conectada") {
            throw new Error("La base de datos no está conectada")
        }
        return { status: "ok", database }
    } catch (error) {
        console.log("Error en el service: - getStatus - ", error)
        throw error
    }
}