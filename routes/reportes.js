const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

router.get('/inventario', reportesController.reporteInventario);
router.get('/costo-inventario', reportesController.reporteCostoInventario);
router.get('/productos-vendidos', reportesController.reporteProductosVendidos);
router.get('/proveedores-productos', reportesController.reporteProveedoresProductos);
router.get('/disponibilidad-producto', reportesController.reporteDisponibilidadProducto);

module.exports = router;