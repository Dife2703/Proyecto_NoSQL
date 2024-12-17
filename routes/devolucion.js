const express = require('express');
const Devolucion = require('../models/devolucion');
const router = express.Router();

// Crear una devolución
router.post('/', async (req, res) => {
  try {
    const devolucion = new Devolucion(req.body);
    const result = await devolucion.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las devoluciones
/*router.get('/', async (req, res) => {
  try {
    const devoluciones = await Devolucion.find().populate('pedidoId');
    res.status(200).json(devoluciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/


// Obtener todas las devoluciones con información del pedido
router.get('/', async (req, res) => {
    try {
      const devoluciones = await Devolucion.find()
        .populate('pedidoId', 'clienteId productos')  // Obtener los detalles del pedido
        .populate('pedidoId.productos.productoId', 'nombre precioUnitario');  // Obtener el nombre y precio del producto
  
      res.status(200).json(devoluciones);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });





// Obtener una devolución por ID
router.get('/:id', async (req, res) => {
  try {
    const devolucion = await Devolucion.findById(req.params.id);
    if (!devolucion) return res.status(404).json({ error: 'Devolución no encontrada' });
    res.status(200).json(devolucion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
// Actualizar devolucion
router.put('/:id', async (req, res) => {
  try {
    const devolucion = await Devolucion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!devolucion) return res.status(404).json({ error: 'Devolucion no encontrada' });
    res.status(200).json(devolucion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
*/



// Eliminar una devolución
router.delete('/:id', async (req, res) => {
  try {
    const devolucion = await Devolucion.findByIdAndDelete(req.params.id);
    if (!devolucion) return res.status(404).json({ error: 'Devolución no encontrada' });
    res.status(200).json({ message: 'Devolución eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
