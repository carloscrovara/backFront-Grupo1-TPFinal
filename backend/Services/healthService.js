exports.getStatus = async () => {
	try {
		return { status: "ok" }
    } catch (error) {
        console.log("Error en el service: - getStatus - ", error)
    }
}
