const express = require('express');
const Tienda = require('../models/tienda');
const router = express.Router();

// Crear una nueva tienda
router.post('/', async (req, res) => {
  try {
    const tienda = new Tienda(req.body);
    const result = await tienda.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las tiendas
router.get('/', async (req, res) => {
  try {
    const tiendas = await Tienda.find();
    res.status(200).json(tiendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una tienda por ID
router.get('/:id', async (req, res) => {
  try {
    const tienda = await Tienda.findById(req.params.id);
    if (!tienda) return res.status(404).json({ error: 'Tienda no encontrada' });
    res.status(200).json(tienda);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una tienda por ID
router.put('/:id', async (req, res) => {
  try {
    const tienda = await Tienda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tienda) return res.status(404).json({ error: 'Tienda no encontrada' });
    res.status(200).json(tienda);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una tienda
router.delete('/:id', async (req, res) => {
  try {
    const tienda = await Tienda.findByIdAndDelete(req.params.id);
    if (!tienda) return res.status(404).json({ error: 'Tienda no encontrada' });
    res.status(200).json({ message: 'Tienda eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
