const express = require('express');
const Producto = require('../models/producto');
const router = express.Router();

// Crear producto
router.post('/', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    const result = await producto.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Leer todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
