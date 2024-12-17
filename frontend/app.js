const apiUrl = 'http://localhost:3000/api';  // Cambia esto a tu servidor de backend

// Variables para manejar estados de edición
let productoEnEdicion = null;
let tiendaEnEdicion = null;
let inventarioEnEdicion = null;
let clienteEnEdicion = null;
let devolucionEnEdicion = null;
let pedidoEnEdicion = null;
let proveedorEnEdicion = null;

// Mostrar u Ocultar botones de Crear y Guardar
function mostrarBotonesEditarCrear(editar = false) {
  const botonGuardar = document.getElementById('guardar-btn');
  const botonCrear = document.getElementById('crear-btn');
  
  if (editar) {
    botonGuardar.style.display = 'inline-block'; // Muestra el botón Guardar
    botonCrear.style.display = 'none'; // Oculta el botón Crear
  } else {
    botonGuardar.style.display = 'none'; // Oculta el botón Guardar
    botonCrear.style.display = 'inline-block'; // Muestra el botón Crear
  }
}


// Función para limpiar el formulario y el estado de edición
function limpiarFormulario(formId) {
  document.getElementById(formId).reset(); // Limpiar los campos del formulario
  productoEnEdicion = null;  // Limpiar el estado de edición
  tiendaEnEdicion = null;
  inventarioEnEdicion = null;
  clienteEnEdicion = null;
  devolucionEnEdicion = null;
  pedidoEnEdicion = null;
  proveedorEnEdicion = null;
}


//APARTADO PRODUCTOS

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
      <strong>${producto.nombre}</strong> - Categoría: ${producto.categoria} - $${producto.precioUnitario}
      <br>Descripción: ${producto.descripcion || 'No disponible'}
      <br>Fecha de Caducidad: ${producto.fechaCaducidad || 'No disponible'}
      <br>Proveedor: ${producto.proveedorId || 'No disponible'}
      <button onclick="eliminarProducto('${producto._id}')">Eliminar</button>
      <button onclick="cargarProducto('${producto._id}')">Editar</button>
    `;
    productoList.appendChild(div);
  });
}


// Crear o editar producto
document.getElementById('producto-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById('producto-nombre').value,
    numeroSerie: document.getElementById('producto-numeroSerie').value,
    categoria: document.getElementById('producto-categoria').value,
    precioUnitario: document.getElementById('producto-precio').value,
    descripcion: document.getElementById('producto-descripcion').value,
    fechaCaducidad: document.getElementById('producto-fechaCaducidad').value,
    proveedorId: document.getElementById('producto-proveedorId').value,
  };

  if (productoEnEdicion) {
    await fetch(`${apiUrl}/productos/${productoEnEdicion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
    productoEnEdicion = null;
  } else {
    await fetch(`${apiUrl}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
  }

  obtenerProductos();
  e.target.reset();
  mostrarBotonesEditarCrear(false); //ocultar boton guardar y mostrar crear
  //NUEVO
  //limpiarFormulario('producto-form'); // Limpiar formulario después de crear o editar
});


// Cargar producto para editar
async function cargarProducto(id) {
  const res = await fetch(`${apiUrl}/productos/${id}`);
  const producto = await res.json();

  document.getElementById('producto-nombre').value = producto.nombre;
  document.getElementById('producto-numeroSerie').value = producto.numeroSerie;
  document.getElementById('producto-categoria').value = producto.categoria;
  document.getElementById('producto-precio').value = producto.precioUnitario;
  document.getElementById('producto-descripcion').value = producto.descripcion || '';
  document.getElementById('producto-fechaCaducidad').value = producto.fechaCaducidad || '';
  document.getElementById('producto-proveedorId').value = producto.proveedorId || '';

  productoEnEdicion = producto._id;
  mostrarBotonesEditarCrear(true); // Mostrar el boton Guardar
}

// Cancelar edición de producto
function cancelarEdicionProducto() {
  productoEnEdicion = null;
  document.getElementById('producto-form').reset();
  mostrarBotonesEditarCrear(false); // Ocultar botón Guardar
}

// Eliminar producto
async function eliminarProducto(id) {
  await fetch(`${apiUrl}/productos/${id}`, { method: 'DELETE' });
  obtenerProductos();
}


//APARTADO TIENDAS


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
      <button onclick="cargarTienda('${tienda._id}')">Editar</button>
    `;
      tiendaList.appendChild(div);
    });
  }

// Crear o editar tienda
document.getElementById('tienda-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const tienda = {
    nombre: document.getElementById('tienda-nombre').value,
    direccion: document.getElementById('tienda-direccion').value,
    ciudad: document.getElementById('tienda-ciudad').value,
    codigoPostal: document.getElementById('tienda-codigoPostal').value,
    capacidad: document.getElementById('tienda-capacidad').value,
    horarioOperacion: document.getElementById('tienda-horarioOperacion').value,
  };

  if (tiendaEnEdicion) {
    await fetch(`${apiUrl}/tiendas/${tiendaEnEdicion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tienda),
    });
    tiendaEnEdicion = null;
  } else {
    await fetch(`${apiUrl}/tiendas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tienda),
    });
  }

  obtenerTiendas();
  e.target.reset();
  mostrarBotonesEditarCrear(false); // Ocultar botón guardar y mostrar crear
  //NUEVO
  //limpiarFormulario('tienda-form'); // Limpiar formulario después de crear o editar
});



// Función para crear una tienda
async function crearTienda() {
  // Verifica si los campos están vacíos antes de enviar el formulario
  if (document.getElementById('tienda-nombre').value.trim() === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Deshabilitar el botón de guardar temporalmente para evitar múltiples envíos
  deshabilitarBotonGuardar();

  const tienda = {
    nombre: document.getElementById('tienda-nombre').value,
    direccion: document.getElementById('tienda-direccion').value,
    ciudad: document.getElementById('tienda-ciudad').value,
    codigoPostal: document.getElementById('tienda-codigoPostal').value,
    capacidad: document.getElementById('tienda-capacidad').value,
    horarioOperacion: document.getElementById('tienda-horarioOperacion').value,
  };

  // Enviar el nuevo dato al backend
  await fetch(`${apiUrl}/tiendas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tienda),
  });

  obtenerTiendas(); // Recargar la lista de tiendas
  limpiarFormulario('tienda-form'); // Limpiar formulario después de crear
  habilitarBotonGuardar(); // Habilitar el botón de guardar después de la operación
}



// Cargar tienda para editar
async function cargarTienda(id) {
  const res = await fetch(`${apiUrl}/tiendas/${id}`);
  const tienda = await res.json();

  document.getElementById('tienda-nombre').value = tienda.nombre;
  document.getElementById('tienda-direccion').value = tienda.direccion;
  document.getElementById('tienda-ciudad').value = tienda.ciudad;
  document.getElementById('tienda-codigoPostal').value = tienda.codigoPostal || '';
  document.getElementById('tienda-capacidad').value = tienda.capacidad || '';
  document.getElementById('tienda-horarioOperacion').value = tienda.horarioOperacion || '';

  tiendaEnEdicion = tienda._id;
  mostrarBotonesEditarCrear(true); // Muestra el botón Guardar
}


// Cancelar edición de tienda
function cancelarEdicionTienda() {
  tiendaEnEdicion = null;
  document.getElementById('tienda-form').reset();
  mostrarBotonesEditarCrear(false); // Ocultar botón Guardar
}

// Eliminar tienda
async function eliminarTienda(id) {
  await fetch(`${apiUrl}/tiendas/${id}`, { method: 'DELETE' });
  obtenerTiendas();
}

// Limpiar el formulario y resetear el estado de edición
function limpiarFormulario(formId) {
  document.getElementById(formId).reset(); // Limpiar los campos del formulario
  tiendaEnEdicion = null; // Limpiar el estado de edición
}



// APARTADO INVENTARIOS

// Obtener todos los inventarios
async function obtenerInventarios() {
  try {
      const res = await fetch(`${apiUrl}/inventarios`);
      if (!res.ok) throw new Error('Error al obtener los inventarios');
      
      const inventarios = await res.json();
      console.log(inventarios); // Verifica qué devuelve la API
      
      const inventarioList = document.getElementById('inventario-list');
      inventarioList.innerHTML = ''; // Limpia la lista antes de agregar los elementos

      if (Array.isArray(inventarios) && inventarios.length > 0) {
          inventarios.forEach(inventario => {
              const div = document.createElement('div');
              div.classList.add('list-item');
              div.innerHTML = `
              Producto: ${inventario.productoId?.nombre || 'Desconocido'} | 
              Tienda: ${inventario.tiendaId?.nombre || 'Sin tienda'} (${inventario.tiendaId?.ciudad || 'N/A'}) |
              Cantidad: ${inventario.cantidad || 0} | 
              Nivel de Alerta: ${inventario.nivelAlerta || 'Sin alerta'}
              <button onclick="eliminarInventario('${inventario._id}')">Eliminar</button>
              <button onclick="cargarInventario('${inventario._id}')">Editar</button>
            `;
              inventarioList.appendChild(div);
          });
      } else {
          inventarioList.innerHTML = '<p>No hay inventarios disponibles.</p>';
      }
  } catch (error) {
      console.error('Error al obtener inventarios:', error);
  }
}

// Crear / Editar Inventario
document.getElementById('inventario-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const inventario = {
      productoId: document.getElementById('inventario-productoId').value,
      tiendaId: document.getElementById('inventario-tiendaId').value,
      cantidad: document.getElementById('inventario-cantidad').value,
      nivelAlerta: document.getElementById('inventario-nivelAlerta').value,
  };

  try {
      if (inventarioEnEdicion) {
          await fetch(`${apiUrl}/inventarios/${inventarioEnEdicion}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(inventario),
          });
          inventarioEnEdicion = null;
      } else {
          await fetch(`${apiUrl}/inventarios`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(inventario),
          });
      }

      obtenerInventarios();
      e.target.reset();
  } catch (error) {
      console.error('Error al guardar el inventario:', error);
  }
});

async function cargarInventario(id) {
  try {
      const res = await fetch(`${apiUrl}/inventarios/${id}`);
      if (!res.ok) throw new Error('Error al cargar el inventario');

      const inventario = await res.json();

      document.getElementById('inventario-productoId').value = inventario.productoId?._id || '';
      document.getElementById('inventario-tiendaId').value = inventario.tiendaId?._id || '';
      document.getElementById('inventario-cantidad').value = inventario.cantidad || 0;
      document.getElementById('inventario-nivelAlerta').value = inventario.nivelAlerta || '';

      inventarioEnEdicion = inventario._id;
  } catch (error) {
      console.error('Error al cargar inventario:', error);
  }
}

function cancelarEdicionInventario() {
  inventarioEnEdicion = null;
  document.getElementById('inventario-form').reset();
}

async function eliminarInventario(id) {
  try {
      await fetch(`${apiUrl}/inventarios/${id}`, { method: 'DELETE' });
      obtenerInventarios();
  } catch (error) {
      console.error('Error al eliminar inventario:', error);
  }
}



// APARTADO CLIENTES

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
      <strong>${cliente.nombre}</strong> - Dirección de Envío: ${cliente.direccionEnvio}
      <button onclick="eliminarCliente('${cliente._id}')">Eliminar</button>
      <button onclick="cargarCliente('${cliente._id}')">Editar</button>
    `;
      clienteList.appendChild(div);
    });
  }

  // Crear / Editar Cliente
  document.getElementById('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const cliente = {
      nombre: document.getElementById('cliente-nombre').value,
      direccionEnvio: document.getElementById('cliente-direccionEnvio').value,
    };
  
    if (clienteEnEdicion) {
      await fetch(`${apiUrl}/clientes/${clienteEnEdicion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
      clienteEnEdicion = null;
    } else {
      await fetch(`${apiUrl}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
    }
  
    obtenerClientes();
    e.target.reset();
  });

  async function cargarCliente(id) {
    const res = await fetch(`${apiUrl}/clientes/${id}`);
    const cliente = await res.json();
  
    document.getElementById('cliente-nombre').value = cliente.nombre;
    document.getElementById('cliente-direccionEnvio').value = cliente.direccionEnvio;
  
    clienteEnEdicion = cliente._id;
  }
  
  function cancelarEdicionCliente() {
    clienteEnEdicion = null;
    document.getElementById('cliente-form').reset();
  }


// Eliminar cliente
  async function eliminarCliente(id) {
      await fetch(`${apiUrl}/clientes/${id}`, { method: 'DELETE' });
      obtenerClientes();
    }


  //APARTADO DEVOLUCIONES
  // Obtener todas las devoluciones
async function obtenerDevoluciones() {
  const res = await fetch(`${apiUrl}/devoluciones`);
  const devoluciones = await res.json();
  const devolucionList = document.getElementById('devolucion-list');
  devolucionList.innerHTML = '';

  devoluciones.forEach(devolucion => {
    const div = document.createElement('div');
    div.classList.add('list-item');
    div.innerHTML = `
      Pedido ID: ${devolucion.pedidoId} | Motivo: ${devolucion.motivo} | Cantidad: ${devolucion.cantidad}
      <button onclick="eliminarDevolucion('${devolucion._id}')">Eliminar</button>
      <button onclick="cargarDevolucion('${devolucion._id}')">Editar</button>
    `;
    devolucionList.appendChild(div);
  });
}

// Crear / Editar Devolución 
  

document.getElementById('devolucion-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const devolucion = {
    pedidoId: document.getElementById('devolucion-pedidoId').value,
    motivo: document.getElementById('devolucion-motivo').value,
    cantidad: document.getElementById('devolucion-cantidad').value,
  };

  if (devolucionEnEdicion) {
    await fetch(`${apiUrl}/devoluciones/${devolucionEnEdicion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(devolucion),
    });
    devolucionEnEdicion = null;
  } else {
    await fetch(`${apiUrl}/devoluciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(devolucion),
    });
  }

  obtenerDevoluciones();
  e.target.reset();
});

async function cargarDevolucion(id) {
  const res = await fetch(`${apiUrl}/devoluciones/${id}`);
  const devolucion = await res.json();

  document.getElementById('devolucion-pedidoId').value = devolucion.pedidoId;
  document.getElementById('devolucion-motivo').value = devolucion.motivo;
  document.getElementById('devolucion-cantidad').value = devolucion.cantidad;

  devolucionEnEdicion = devolucion._id;
}

function cancelarEdicionDevolucion() {
  devolucionEnEdicion = null;
  document.getElementById('devolucion-form').reset();
}

// Eliminar devolución
async function eliminarDevolucion(id) {
    await fetch(`${apiUrl}/devoluciones/${id}`, { method: 'DELETE' });
    obtenerDevoluciones();
}

// APARTADO DE PEDIDOS

// Obtener todos los pedidos
async function obtenerPedidos() {
  const res = await fetch(`${apiUrl}/pedidos`);
  const pedidos = await res.json();
  const pedidoList = document.getElementById('pedido-list');
  pedidoList.innerHTML = '';

  pedidos.forEach(pedido => {
    const div = document.createElement('div');
    div.classList.add('list-item');
    div.innerHTML = `
      Cliente: ${pedido.clienteId.nombre} | Productos: ${pedido.productos.map(p => `${p.productoId.nombre} (Cantidad: ${p.cantidad})`).join(', ')}
      <button onclick="eliminarPedido('${pedido._id}')">Eliminar</button>
      <button onclick="cargarPedido('${pedido._id}')">Editar</button>
    `;
    pedidoList.appendChild(div);
  });
}

// Crear / Editar Pedido

document.getElementById('pedido-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const pedido = {
    clienteId: document.getElementById('pedido-clienteId').value,
    productos: [{
      productoId: document.getElementById('pedido-productoId').value,
      cantidad: document.getElementById('pedido-cantidad').value
    }],
  };

  if (pedidoEnEdicion) {
    await fetch(`${apiUrl}/pedidos/${pedidoEnEdicion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });
    pedidoEnEdicion = null;
  } else {
    await fetch(`${apiUrl}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });
  }

  obtenerPedidos();
  e.target.reset();
});

async function cargarPedido(id) {
  const res = await fetch(`${apiUrl}/pedidos/${id}`);
  const pedido = await res.json();

  document.getElementById('pedido-clienteId').value = pedido.clienteId._id;
  document.getElementById('pedido-productoId').value = pedido.productos[0].productoId._id;
  document.getElementById('pedido-cantidad').value = pedido.productos[0].cantidad;

  pedidoEnEdicion = pedido._id;
}

function cancelarEdicionPedido() {
  pedidoEnEdicion = null;
  document.getElementById('pedido-form').reset();
}
  
  // Eliminar pedido
  async function eliminarPedido(id) {
    await fetch(`${apiUrl}/pedidos/${id}`, { method: 'DELETE' });
    obtenerPedidos();
  }
  

// APARTADO PROOVEDORES ORIGINAL

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
      <button onclick="cargarProveedor('${proveedor._id}')">Editar</button>
    `;
    proveedorList.appendChild(div);
  });
}

// Crear / Editar Proveedor
  
document.getElementById('proveedor-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const proveedor = {
    nombre: document.getElementById('proveedor-nombre').value,
    direccion: document.getElementById('proveedor-direccion').value,
    contacto: document.getElementById('proveedor-contacto').value,
  };

  if (proveedorEnEdicion) {
    await fetch(`${apiUrl}/proveedores/${proveedorEnEdicion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proveedor),
    });
    proveedorEnEdicion = null;
  } else {
    await fetch(`${apiUrl}/proveedores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proveedor),
    });
  }

  obtenerProveedores();
  e.target.reset();
});

async function cargarProveedor(id) {
  const res = await fetch(`${apiUrl}/proveedores/${id}`);
  const proveedor = await res.json();

  document.getElementById('proveedor-nombre').value = proveedor.nombre;
  document.getElementById('proveedor-direccion').value = proveedor.direccion;
  document.getElementById('proveedor-contacto').value = proveedor.contacto;

  proveedorEnEdicion = proveedor._id;
}

function cancelarEdicionProveedor() {
  proveedorEnEdicion = null;
  document.getElementById('proveedor-form').reset();
}  // Eliminar proveedor
  async function eliminarProveedor(id) {
    await fetch(`${apiUrl}/proveedores/${id}`, { method: 'DELETE' });
    obtenerProveedores();
  }




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
