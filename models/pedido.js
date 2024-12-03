const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      cantidad: { type: Number }
    }
  ],
  estado: { type: String, enum: ['pendiente', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
