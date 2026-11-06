const mongoose = require('mongoose')

const autorSchema = new mongoose.Schema(
  {
    apellido: { type: String, required: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    pais: {
      type: String,
      enum: ['Argentina', 'Brasil', 'Chile', 'Uruguay',
        'Paraguay', 'Bolivia', 'Peru', 'Mexico',
        'Espana', 'Italia', 'Francia', 'Otro']
    }
  }
)

module.exports = mongoose.model('Autor', autorSchema)