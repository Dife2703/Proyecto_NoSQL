const express = require('express');
const Cliente = require('../models/cliente');
const router = express.Router();

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    const result = await cliente.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
