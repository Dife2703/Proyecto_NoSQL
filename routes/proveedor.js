const express = require('express');
const Proveedor = require('../models/proveedor');
const router = express.Router();

// Crear un nuevo proveedor
router.post('/', async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    const result = await proveedor.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await Proveedor.find().populate('productosSuministrados');
    res.status(200).json(proveedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un proveedor por ID
router.get('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id).populate('productosSuministrados');
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.status(200).json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar proovedor
router.put('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.status(200).json(proveedor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Eliminar un proveedor
router.delete('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.status(200).json({ message: 'Proveedor eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
