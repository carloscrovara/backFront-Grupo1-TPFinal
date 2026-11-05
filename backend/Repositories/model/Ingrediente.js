const mongoose = require("mongoose");

const ingredienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true, trim: true },
  unidadMedida: { type: String, trim: true },
  calorias: { type: Number, min: 0 },
});

module.exports = mongoose.model("Ingrediente", ingredienteSchema);
