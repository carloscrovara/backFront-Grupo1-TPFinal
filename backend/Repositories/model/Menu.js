const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    tipoComida: { type: String, enum: ['desayuno', 'almuerzo', 'merienda', 'cena', 'postre'] },
    recetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receta' }]
  }
)

module.exports = mongoose.model('Menu', menuSchema)