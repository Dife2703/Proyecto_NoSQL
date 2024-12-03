const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccionEnvio: { type: String },
  historialPedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }]
});

module.exports = mongoose.model('Cliente', clienteSchema);
