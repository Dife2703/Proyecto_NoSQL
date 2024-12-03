const express = require('express');
const Inventario = require('../models/inventario');
const router = express.Router();

// Crear un nuevo inventario
router.post('/', async (req, res) => {
  try {
    const inventario = new Inventario(req.body);
    const result = await inventario.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los inventarios todo el objeto completo
/*router.get('/', async (req, res) => {
  try {
    const inventarios = await Inventario.find()
      .populate('productoId')
      .populate('tiendaId');
    res.status(200).json(inventarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/

// Obtener todos los inventarios con solamente información del producto y la tienda
router.get('/', async (req, res) => {
    try {
      const inventarios = await Inventario.find()
        .populate('productoId', 'nombre')  // Solo obtiene el campo 'nombre' del producto
        .populate('tiendaId', 'nombre ciudad'); // Solo obtiene 'nombre' y 'ciudad' de la tienda
  
      res.status(200).json(inventarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




// Obtener un inventario por ID
router.get('/:id', async (req, res) => {
  try {
    const inventario = await Inventario.findById(req.params.id)
      .populate('productoId')
      .populate('tiendaId');
    if (!inventario) return res.status(404).json({ error: 'Inventario no encontrado' });
    res.status(200).json(inventario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un inventario por ID
router.put('/:id', async (req, res) => {
  try {
    const inventario = await Inventario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inventario) return res.status(404).json({ error: 'Inventario no encontrado' });
    res.status(200).json(inventario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un inventario
router.delete('/:id', async (req, res) => {
  try {
    const inventario = await Inventario.findByIdAndDelete(req.params.id);
    if (!inventario) return res.status(404).json({ error: 'Inventario no encontrado' });
    res.status(200).json({ message: 'Inventario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
