const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const productoRoutes = require('./routes/producto');
const inventarioRoutes = require('./routes/inventario');
const tiendaRoutes = require('./routes/tienda');
const clienteRoutes = require('./routes/cliente');
const devolucionRoutes = require('./routes/devolucion');
const pedidoRoutes = require('./routes/pedido');
const proveedorRoutes = require('./routes/proveedor');

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

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/tiendas', tiendaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/devoluciones', devolucionRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/proveedores', proveedorRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));