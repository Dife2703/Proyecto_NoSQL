const apiUrl = 'http://localhost:3000/api';  // Cambia esto a tu servidor de backend

// Función para obtener todos los productos
/*async function obtenerProductos() {
  const res = await fetch(`${apiUrl}/productos`);
  const productos = await res.json();
  const productoList = document.getElementById('producto-list');
  productoList.innerHTML = '';
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('list-item');
    div.innerHTML = `
      <strong>${producto.nombre}</strong> - ${producto.categoria} - $${producto.precioUnitario}
      <button onclick="eliminarProducto('${producto._id}')">Eliminar</button>
    `;
    productoList.appendChild(div);
  });
}*/

// Función para obtener productos
// Obtener todos los productos
async function obtenerProductos() {
  const res = await fetch(`${apiUrl}/productos`);
  const productos = await res.json();
  const productoList = document.getElementById('producto-list');
  productoList.innerHTML = '';  // Limpiamos la lista antes de agregar los nuevos elementos

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('list-item');
    
    div.innerHTML = `
      <strong>${producto.nombre}</strong> - ${producto.categoria} - $${producto.precioUnitario}
      <br>Descripción: ${producto.descripcion || 'No disponible'}
      <br>Fecha de Caducidad: ${producto.fechaCaducidad || 'No disponible'}
      <br>Proveedor ID: ${producto.proveedorId ? producto.proveedorId.nombre : 'No disponible'}
      <button onclick="eliminarProducto('${producto._id}')">Eliminar</button>
    `;
    productoList.appendChild(div);
  });
}



// Función para obtener todas las tiendas
// Obtener todas las tiendas
async function obtenerTiendas() {
    const res = await fetch(`${apiUrl}/tiendas`);
    const tiendas = await res.json();
    const tiendaList = document.getElementById('tienda-list');
    tiendaList.innerHTML = '';  // Limpiamos la lista antes de agregar los nuevos elementos
  
    tiendas.forEach(tienda => {
      const div = document.createElement('div');
      div.classList.add('list-item');
      
      // Mostramos los campos de la tienda
      div.innerHTML = `
        <strong>${tienda.nombre}</strong> - Dirección: ${tienda.direccion} - Ciudad: ${tienda.ciudad} 
        <br>Código Postal: ${tienda.codigoPostal || 'No disponible'}
        <br>Capacidad de Almacenamiento: ${tienda.capacidad || 'No disponible'}
        <br>Horario de Operación: ${tienda.horarioOperacion || 'No disponible'}
        <button onclick="eliminarTienda('${tienda._id}')">Eliminar</button>
      `;
      tiendaList.appendChild(div);
    });
  }

// Función para obtener todos los inventarios
/*async function obtenerInventarios() {
  const res = await fetch(`${apiUrl}/inventarios`);
  const inventarios = await res.json();
  const inventarioList = document.getElementById('inventario-list');
  inventarioList.innerHTML = '';
  inventarios.forEach(inventario => {
    const div = document.createElement('div');
    div.classList.add('list-item');
    div.innerHTML = `
      Producto: ${inventario.productoId} | Tienda: ${inventario.tiendaId} | Cantidad: ${inventario.cantidad}
      <button onclick="eliminarInventario('${inventario._id}')">Eliminar</button>
    `;
    inventarioList.appendChild(div);
  });
}*/






// Obtener todos los inventarios
async function obtenerInventarios() {
    const res = await fetch(`${apiUrl}/inventarios`);
    const inventarios = await res.json();
    const inventarioList = document.getElementById('inventario-list');
    inventarioList.innerHTML = '';
    
    inventarios.forEach(inventario => {
      const div = document.createElement('div');
      div.classList.add('list-item');
      div.innerHTML = `
        Producto: ${inventario.productoId.nombre} | Tienda: ${inventario.tiendaId.nombre} (${inventario.tiendaId.ciudad}) 
        | Cantidad: ${inventario.cantidad} | Nivel de Alerta: ${inventario.nivelAlerta}
        <button onclick="eliminarInventario('${inventario._id}')">Eliminar</button>
      `;
      inventarioList.appendChild(div);
    });
  }
  


// Función para eliminar un producto
async function eliminarProducto(id) {
  await fetch(`${apiUrl}/productos/${id}`, { method: 'DELETE' });
  obtenerProductos();
}

// Función para eliminar una tienda
async function eliminarTienda(id) {
  await fetch(`${apiUrl}/tiendas/${id}`, { method: 'DELETE' });
  obtenerTiendas();
}

// Función para eliminar un inventario
async function eliminarInventario(id) {
  await fetch(`${apiUrl}/inventarios/${id}`, { method: 'DELETE' });
  obtenerInventarios();
}



// Obtener todos los clientes
async function obtenerClientes() {
    const res = await fetch(`${apiUrl}/clientes`);
    const clientes = await res.json();
    const clienteList = document.getElementById('cliente-list');
    clienteList.innerHTML = '';
    clientes.forEach(cliente => {
      const div = document.createElement('div');
      div.classList.add('list-item');
      div.innerHTML = `
        <strong>${cliente.nombre}</strong> - Dirección de envío: ${cliente.direccionEnvio}
        <button onclick="eliminarCliente('${cliente._id}')">Eliminar</button>
      `;
      clienteList.appendChild(div);
    });
  }

// Eliminar cliente
async function eliminarCliente(id) {
    await fetch(`${apiUrl}/clientes/${id}`, { method: 'DELETE' });
    obtenerClientes();
  }




// Obtener todas las devoluciones
async function obtenerDevoluciones() {
    const res = await fetch(`${apiUrl}/devoluciones`);
    const devoluciones = await res.json();
    const devolucionList = document.getElementById('devolucion-list');
    devolucionList.innerHTML = '';
  
    devoluciones.forEach(devolucion => {
      const div = document.createElement('div');
      div.classList.add('list-item');
  
      // Accedemos a los datos del pedido y los productos de la devolución
      const pedido = devolucion.pedidoId ? devolucion.pedidoId._id : 'Desconocido';
      const motivo = devolucion.motivo;
      const cantidad = devolucion.cantidad;
  
      div.innerHTML = `
        Pedido ID: ${pedido} | Motivo: ${motivo} | Cantidad: ${cantidad}
        <button onclick="eliminarDevolucion('${devolucion._id}')">Eliminar</button>
      `;
      devolucionList.appendChild(div);
    });
  }
  
  // Eliminar devolución
  async function eliminarDevolucion(id) {
    await fetch(`${apiUrl}/devoluciones/${id}`, { method: 'DELETE' });
    obtenerDevoluciones();
  }


// Obtener todos los pedidos
async function obtenerPedidos() {
    const res = await fetch(`${apiUrl}/pedidos`);
    const pedidos = await res.json();
    const pedidoList = document.getElementById('pedido-list');
    pedidoList.innerHTML = '';
  
    pedidos.forEach(pedido => {
      const div = document.createElement('div');
      div.classList.add('list-item');
      
      // Accedemos a los datos del cliente y productos
      const cliente = pedido.clienteId ? pedido.clienteId.nombre : 'Desconocido';
      const productos = pedido.productos.map(p => `${p.productoId.nombre} (Cantidad: ${p.cantidad})`).join(', ');
  
      div.innerHTML = `
        Cliente: ${cliente} | Productos: ${productos}
        <button onclick="eliminarPedido('${pedido._id}')">Eliminar</button>
      `;
      pedidoList.appendChild(div);
    });
  }

  // Crear pedido
document.getElementById('pedido-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pedido = {
      clienteId: document.getElementById('pedido-clienteId').value,  // ID del cliente
      productos: [{
        productoId: document.getElementById('pedido-productoId').value,  // ID del producto
        cantidad: document.getElementById('pedido-cantidad').value  // Cantidad
      }]
    };
  
    // Enviar el pedido al backend
    await fetch(`${apiUrl}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    obtenerPedidos();
  e.target.reset();
});


  
  // Eliminar pedido
  async function eliminarPedido(id) {
    await fetch(`${apiUrl}/pedidos/${id}`, { method: 'DELETE' });
    obtenerPedidos();
  }


// Obtener todos los proveedores
async function obtenerProveedores() {
    const res = await fetch(`${apiUrl}/proveedores`);
    const proveedores = await res.json();
    const proveedorList = document.getElementById('proveedor-list');
    proveedorList.innerHTML = '';
    proveedores.forEach(proveedor => {
      const div = document.createElement('div');
      div.classList.add('list-item');
      div.innerHTML = `
        ${proveedor.nombre} - Contacto: ${proveedor.contacto}
        <button onclick="eliminarProveedor('${proveedor._id}')">Eliminar</button>
      `;
      proveedorList.appendChild(div);
    });
  }
  
  // Eliminar proveedor
  async function eliminarProveedor(id) {
    await fetch(`${apiUrl}/proveedores/${id}`, { method: 'DELETE' });
    obtenerProveedores();
  }




























// Manejo de formularios de productos
// Crear producto
document.getElementById('producto-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const producto = {
    nombre: document.getElementById('producto-nombre').value,
    numeroSerie: document.getElementById('producto-numeroSerie').value,
    categoria: document.getElementById('producto-categoria').value,
    precioUnitario: document.getElementById('producto-precio').value,
    descripcion: document.getElementById('producto-descripcion').value,
    fechaCaducidad: document.getElementById('producto-fechaCaducidad').value,
    proveedorId: document.getElementById('producto-proveedorId').value
  };

  await fetch(`${apiUrl}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  obtenerProductos();
  e.target.reset();
});

// Manejo de formularios de tiendas
// Crear tienda
document.getElementById('tienda-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tienda = {
      nombre: document.getElementById('tienda-nombre').value,
      direccion: document.getElementById('tienda-direccion').value,
      ciudad: document.getElementById('tienda-ciudad').value,
      codigoPostal: document.getElementById('tienda-codigoPostal').value,
      capacidad: document.getElementById('tienda-capacidad').value,
      horarioOperacion: document.getElementById('tienda-horarioOperacion').value
    };
    await fetch(`${apiUrl}/tiendas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tienda)
    });
    obtenerTiendas();
    e.target.reset();
  });

// Manejo de formularios de inventarios
document.getElementById('inventario-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inventario = {
    productoId: document.getElementById('inventario-productoId').value,
    tiendaId: document.getElementById('inventario-tiendaId').value,
    cantidad: document.getElementById('inventario-cantidad').value,
    nivelAlerta: document.getElementById('inventario-nivelAlerta').value
  };
  await fetch(`${apiUrl}/inventarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inventario)
  });
  obtenerInventarios();
  e.target.reset();
});

// Crear cliente
document.getElementById('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cliente = {
      nombre: document.getElementById('cliente-nombre').value,
      direccionEnvio: document.getElementById('cliente-direccionEnvio').value
    };
    await fetch(`${apiUrl}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
    obtenerClientes();
    e.target.reset();
  });

  // Crear devolución
document.getElementById('devolucion-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const devolucion = {
      pedidoId: document.getElementById('devolucion-pedidoId').value,
      motivo: document.getElementById('devolucion-motivo').value,
      cantidad: document.getElementById('devolucion-cantidad').value
    };
    await fetch(`${apiUrl}/devoluciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(devolucion)
    });
    obtenerDevoluciones();
    e.target.reset();
  });

  // Crear pedido
document.getElementById('pedido-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pedido = {
      clienteId: document.getElementById('pedido-clienteId').value,
      productos: JSON.parse(document.getElementById('pedido-productos').value) // Suponiendo que pasamos un array
    };
    await fetch(`${apiUrl}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    obtenerPedidos();
    e.target.reset();
  });

  // Crear proveedor
document.getElementById('proveedor-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const proveedor = {
      nombre: document.getElementById('proveedor-nombre').value,
      direccion: document.getElementById('proveedor-direccion').value,
      contacto: document.getElementById('proveedor-contacto').value
    };
    await fetch(`${apiUrl}/proveedores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proveedor)
    });
    obtenerProveedores();
    e.target.reset();
  });


// Llamar a las funciones al cargar la página
window.onload = () => {
  obtenerProductos();
  obtenerTiendas();
  obtenerInventarios();
  obtenerClientes();
  obtenerDevoluciones();
  obtenerPedidos();
  obtenerProveedores();
};
