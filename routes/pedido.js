const express = require('express');
const Pedido = require('../models/pedido');
const router = express.Router();

// Crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    const result = await pedido.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Obtener todos los pedidos
/*
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('clienteId').populate('productos.productoId');
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/


// Obtener todos los pedidos con información del cliente y productos
router.get('/', async (req, res) => {
    try {
      const pedidos = await Pedido.find()
        .populate('clienteId', 'nombre')  // Obtener el nombre del cliente
        .populate('productos.productoId', 'nombre precioUnitario');  // Obtener el nombre y precio del producto
  
      res.status(200).json(pedidos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });





// Obtener un pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('clienteId').populate('productos.productoId');
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.status(200).json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar el estado de un pedido
router.put('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.status(200).json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un pedido
router.delete('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.status(200).json({ message: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
