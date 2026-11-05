const ingredienteService = require("../Services/ingredienteService");

exports.readIngredientes = async (req, res) => {
  try {
    res.status(200).json(await ingredienteService.getAllIngredientes());
  } catch (error) {
    console.log("Error en el controller: - readIngredientes - ", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.readIngredienteById = async (req, res) => {
  try {
    const id = req.params.id;
    const ingrediente = await ingredienteService.getIngredienteById(id);

    if (ingrediente.length === 0) {
      return res
        .status(404)
        .send(`No se encuentra un ingrediente con el id: ${id}`);
    }

    res.status(200).json(ingrediente);
  } catch (error) {
    console.log("Error en el controller: - readIngredienteById - ", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.createIngrediente = async (req, res) => {
  try {
    const ingredienteNuevo = req.body;
    res
      .status(200)
      .json(await ingredienteService.createNewIngrediente(ingredienteNuevo));
  } catch (error) {
    console.log("Error en el controller: - createIngrediente - ", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor al crear el ingrediente" });
  }
};

exports.updateIngrediente = async (req, res) => {
  try {
    const id = req.params.id;
    const ingredienteActualizado = req.body;

    const ingrediente = await ingredienteService.updateIngredienteService(
      id,
      ingredienteActualizado,
    );

    if (ingrediente.length === 0) {
      return res
        .status(404)
        .send(`No se encuentra un ingrediente a actualizar con el id: ${id}`);
    }

    res.status(200).json(ingrediente);
  } catch (error) {
    console.log("Error en el controller: - updateIngrediente - ", error);
    return res.status(500).json({
      error: "Error interno del servidor al actualizar el ingrediente",
    });
  }
};

exports.deleteIngrediente = async (req, res) => {
  try {
    const id = req.params.id;
    const ingrediente = await ingredienteService.deleteIngredienteService(id);

    if (ingrediente.length === 0) {
      return res
        .status(404)
        .send(`No se encuentra un ingrediente a eliminar con el id: ${id}`);
    }

    res.status(200).json(ingrediente);
  } catch (error) {
    console.log("Error en el controller: - deleteIngrediente - ", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor al eliminar el ingrediente" });
  }
};
