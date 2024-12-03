const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String },
  contacto: { type: String },
  productosSuministrados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }]
});

module.exports = mongoose.model('Proveedores', proveedorSchema);
