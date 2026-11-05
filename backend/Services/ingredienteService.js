const ingredienteRepository = require("../Repositories/ingredienteRepository");

exports.getAllIngredientes = async () => {
  try {
    return await ingredienteRepository.getAllIngredientesRepository();
  } catch (error) {
    throw error;
  }
};

exports.getIngredienteById = async (id) => {
  try {
    return await ingredienteRepository.getIngredienteByIdRepository(id);
  } catch (error) {
    throw error;
  }
};

exports.createNewIngrediente = async (ingredienteNuevo) => {
  try {
    return await ingredienteRepository.createNewIngredienteRepository(
      ingredienteNuevo,
    );
  } catch (error) {
    throw error;
  }
};

exports.updateIngredienteService = async (id, ingredienteActualizado) => {
  try {
    return await ingredienteRepository.updateIngredienteRepository(
      id,
      ingredienteActualizado,
    );
  } catch (error) {
    throw error;
  }
};

exports.deleteIngredienteService = async (id) => {
  try {
    return await ingredienteRepository.deleteIngredienteRepository(id);
  } catch (error) {
    throw error;
  }
};
