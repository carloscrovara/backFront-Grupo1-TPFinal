const mongoose = require('mongoose')

const recetaSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        tiempoPreparacion: { type: Number, min: 0 },
        porciones: { type: Number, min: 1 },
        dificultad: { type: String, enum: ['facil', 'media', 'dificil'] },
        ingredientes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente' }],
        autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor' },
        categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
    }
)

module.exports = mongoose.model('Receta', recetaSchema)