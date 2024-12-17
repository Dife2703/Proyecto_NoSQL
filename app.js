const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('./controllers/redisClient');


const productoRoutes = require('./routes/producto');
const inventarioRoutes = require('./routes/inventario');
const tiendaRoutes = require('./routes/tienda');
const clienteRoutes = require('./routes/cliente');
const devolucionRoutes = require('./routes/devolucion');
const pedidoRoutes = require('./routes/pedido');
const proveedorRoutes = require('./routes/proveedor');
const reportesRoutes = require('./routes/reportes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
//mongoose.connect('mongodb+srv://ruizv2938:zVHxKkrFr3WmlsXX@cluster0.5qyro.mongodb.net/')
mongoose.connect('mongodb+srv://ieioianos:lFrgKCVmmPxS58P8@cluster0.21kfo.mongodb.net/ProyectoNoSQL', {
    dbName: 'ProyectoNoSQL', //nombre de la base de datos
}).then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));


/*
// Función que guarda los reportes en Redis al iniciar el servidor
const almacenarReportesEnRedis = async () => {
    try {
      const inventario = await reportesController.reporteInventario();
      const costoInventario = await reportesController.reporteCostoInventario();
      const productosVendidos = await reportesController.reporteProductosVendidos();
      const proveedoresProductos = await reportesController.reporteProveedoresProductos();
      const disponibilidadProducto = await reportesController.reporteDisponibilidadProducto();
  
      // Almacenamos los resultados en Redis
      redis.set('inventario', JSON.stringify(inventario));
      redis.set('costoInventario', JSON.stringify(costoInventario));
      redis.set('productosVendidos', JSON.stringify(productosVendidos));
      redis.set('proveedoresProductos', JSON.stringify(proveedoresProductos));
      redis.set('disponibilidadProducto', JSON.stringify(disponibilidadProducto));
  
      console.log('Reportes almacenados en Redis.');
    } catch (error) {
      console.error('Error al almacenar reportes en Redis:', error);
    }
  };*/
  
  
  

  
// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/tiendas', tiendaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/devoluciones', devolucionRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/reportes', reportesRoutes);
const reportesController = require('./controllers/reportesController');

// Iniciar servidor
// Llamamos a la función de almacenamiento de reportes **después de la configuración del servidor**
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor escuchando en puerto ${process.env.PORT || 3000}`);
  
    // Después de iniciar el servidor, almacenamos los reportes en Redis
    //almacenarReportesEnRedis();
  });