const mongoose = require('mongoose');

const tiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  codigoPostal: { type: String },
  capacidad: { type: Number },
  horarioOperacion: { type: String }
});

module.exports = mongoose.model('Tienda', tiendaSchema);
