const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  numeroSerie: { type: String, unique: true, required: true },
  categoria: { type: String, required: true },
  precioUnitario: { type: Number, required: true },
  fechaCaducidad: { type: Date },
  proveedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' }
});

module.exports = mongoose.model('Producto', productoSchema);