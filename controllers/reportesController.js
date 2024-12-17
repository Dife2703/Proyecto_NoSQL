const Inventario = require('../models/inventario');
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');
const Tienda = require('../models/tienda');
const Proveedor = require('../models/proveedor');

// Reporte 1: Stock en la tienda
exports.reporteInventario = async (req, res) => {
  try {
    const reporte = await Inventario.aggregate([
      { $lookup: { from: 'productos', localField: 'productoId', foreignField: '_id', as: 'producto' } },
      { $lookup: { from: 'tiendas', localField: 'tiendaId', foreignField: '_id', as: 'tienda' } },
      { $unwind: '$producto' },
      { $unwind: '$tienda' },
      { $project: { tienda: '$tienda.nombre', producto: '$producto.nombre', stock: '$cantidad' } },
    ]);
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el reporte de inventario.' });
  }
};

// Reporte: Costo total del inventario por tienda y producto
// Reporte: Costo total del inventario
exports.reporteCostoInventario = async (req, res) => {
    try {
      const costoInventario = await Tienda.aggregate([
        {
          $unwind: '$productos', // Desglosar los productos dentro de cada tienda
        },
        {
          $project: {
            tienda: '$nombre', // Nombre de la tienda
            producto: '$productos.nombre', // Nombre del producto
            precioUnitario: '$productos.precioUnitario', // Precio unitario del producto
            stock: '$productos.stock', // Cantidad en inventario
            costoTotal: { $multiply: ['$productos.precioUnitario', '$productos.stock'] }, // Costo total
          },
        },
      ]);
  
      res.json(costoInventario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al generar el reporte del costo del inventario.' });
    }
  };

// Reporte 3: Productos vendidos en un rango de fechas
exports.reporteProductosVendidos = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const reporte = await Pedido.aggregate([
      { $match: { fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) } } },
      { $unwind: '$productos' },
      { $lookup: { from: 'productos', localField: 'productos.productoId', foreignField: '_id', as: 'producto' } },
      { $unwind: '$producto' },
      { $group: { _id: '$producto.nombre', cantidadVendida: { $sum: '$productos.cantidad' } } },
      { $project: { producto: '$_id', cantidadVendida: 1, _id: 0 } },
    ]);
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el reporte de productos vendidos.' });
  }
};

// Reporte: Proveedores y productos que venden
exports.reporteProveedoresProductos = async (req, res) => {
    try {
      const reporteProveedores = await Tienda.aggregate([
        {
          $unwind: '$proveedores', // Desglosar los proveedores dentro de cada tienda
        },
        {
          $unwind: '$productos', // Desglosar los productos dentro de cada tienda
        },
        {
          $match: {
            'productos.proveedorId': { $exists: true }, // Asegurarnos de que los productos tengan un proveedor asociado
          },
        },
        {
          $project: {
            proveedor: '$proveedores.nombre', // Nombre del proveedor
            producto: '$productos.nombre', // Nombre del producto
            precioCompra: '$productos.precioUnitario', // Precio del producto
            tienda: '$nombre', // Nombre de la tienda
          },
        },
      ]);
  
      res.json(reporteProveedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al generar el reporte de proveedores y productos.' });
    }
  };

// Reporte: Disponibilidad de un producto en diferentes tiendas
// Reporte: Disponibilidad de un producto en diferentes tiendas
exports.reporteDisponibilidadProducto = async (req, res) => {
    try {
        const { productoId } = req.query;
    
        if (!productoId) {
          return res.status(400).json({ error: 'El ID del producto es requerido.' });
        }
    
        const disponibilidadProducto = await Tienda.aggregate([
          {
            $unwind: '$productos', // Desglosar los productos dentro de cada tienda
          },
          {
            $match: {
              'productos._id': new mongoose.Types.ObjectId(productoId), // Filtrar por el ID del producto
            },
          },
          {
            $project: {
              tienda: '$nombre', // Nombre de la tienda
              ciudad: '$ciudad', // Ciudad de la tienda
              producto: '$productos.nombre', // Nombre del producto
              stock: '$productos.stock', // Stock disponible del producto
            },
          },
        ]);
    
        res.json(disponibilidadProducto);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar el reporte de disponibilidad del producto.' });
      }
  };