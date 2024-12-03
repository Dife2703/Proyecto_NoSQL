const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  tiendaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true },
  cantidad: { type: Number, required: true },
  fechaLlegada: { type: Date, default: Date.now },
  fechaUltimaActualizacion: { type: Date, default: Date.now },
  nivelAlerta: { type: Number }
});

module.exports = mongoose.model('Inventario', inventarioSchema);
