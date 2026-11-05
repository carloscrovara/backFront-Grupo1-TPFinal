const { getMongoDBConnection } = require("../database/conexion");
const Ingrediente = require("./model/Ingrediente.js");

getMongoDBConnection();

exports.getAllIngredientesRepository = async () => {
  try {
    return await Ingrediente.find();
  } catch (error) {
    throw error;
  }
};

exports.getIngredienteByIdRepository = async (id) => {
  try {
    const ingrediente = await Ingrediente.findById(id);
    if (!ingrediente) {
      return [];
    }
    return ingrediente;
  } catch (error) {
    throw error;
  }
};

exports.createNewIngredienteRepository = async (ingredienteNuevo) => {
  try {
    const ingrediente = new Ingrediente(ingredienteNuevo);
    await ingrediente.save();
    return ingrediente;
  } catch (error) {
    throw error;
  }
};

exports.updateIngredienteRepository = async (id, ingredienteActualizado) => {
  try {
    const ingrediente = await Ingrediente.findByIdAndUpdate(
      id,
      ingredienteActualizado,
      { new: true, runValidators: true },
    );
    if (!ingrediente) {
      return [];
    }
    return ingrediente;
  } catch (error) {
    throw error;
  }
};

exports.deleteIngredienteRepository = async (id) => {
  try {
    const ingrediente = await Ingrediente.findByIdAndDelete(id);
    if (!ingrediente) {
      return [];
    }
    return ingrediente;
  } catch (error) {
    throw error;
  }
};
