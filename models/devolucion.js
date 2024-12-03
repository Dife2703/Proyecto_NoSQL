const mongoose = require('mongoose');

const devolucionSchema = new mongoose.Schema({
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
  motivo: { type: String, required: true },
  cantidad: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Devoluciones', devolucionSchema);
