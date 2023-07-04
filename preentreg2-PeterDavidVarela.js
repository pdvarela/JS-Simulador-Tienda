
// Clase Producto
class Producto {
  constructor(nombre, precio, cantidad, codigo) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.codigo = codigo;
  }
}

// Objeto Carrito de Compras
const carritoDeCompras = {
  productos: [],

  // Método para agregar un producto al carrito
  agregarProducto: function (productoSeleccionado) {
    const { nombre, precio, cantidad, codigo } = productoSeleccionado;
    const productoExistente = this.productos.find((producto) => producto.codigo === codigo);

    if (productoExistente) {
      productoExistente.cantidad = cantidad;
    } else {
      const nuevoProducto = new Producto(nombre, precio, cantidad, codigo);
      this.productos.push(nuevoProducto);
    }

    alert(`Se agregaron ${cantidad} unidades de ${nombre} al carrito.`);
  },

  // Método para quitar un producto del carrito
  quitarProducto: function (codigo) {

    if (this.productos.length === 0) {
      alert('El carrito está vacío. No hay productos para quitar.');
      const opcionSeleccionada = mostrarMenu();
      ejecutarOpcion(opcionSeleccionada);
      return;
    }
  
    let productosEnCarritoMensaje = 'Productos en el carrito:\n';
    this.productos.forEach((producto) => {
      productosEnCarritoMensaje += `Código: ${producto.codigo}, ${producto.nombre} - ${producto.cantidad} unidades - $${producto.precio.toFixed(2)} c/u - Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}\n`;
    });
    alert(productosEnCarritoMensaje);

    const indiceProducto = this.productos.findIndex((producto) => producto.codigo === codigo);

    if (indiceProducto !== -1) {
      const productoEliminado = this.productos.splice(indiceProducto, 1);
      alert(`Se eliminó el producto ${productoEliminado[0].nombre} del carrito.`);
    } else {
      alert(`No se encontró el producto con código ${codigo} en el carrito.`);
    }
  },

  // Método para calcular el subtotal de un producto
  calcularSubtotal: function (producto) {
    return producto.precio * producto.cantidad;
  },

  // Método para calcular el total de la compra
  calcularTotal: function () {
    const subtotal = this.productos.reduce((total, producto) => total + this.calcularSubtotal(producto), 0);
    const iva = subtotal * 0.12;
    return subtotal + iva;
  },

  // Método para mostrar los productos en el carrito
  mostrarProductos: function () {
    let productosMensaje = 'Productos en el carrito:\n\n';
    let totalProductos = 0;

    this.productos.forEach((producto) => {
      const subtotal = this.calcularSubtotal(producto);
      productosMensaje += `${producto.nombre} | Código: ${producto.codigo} | ${producto.cantidad} unidades | $${producto.precio.toFixed(2)} c/u - Subtotal: $${subtotal.toFixed(2)}\n`;
      totalProductos += subtotal;
    });

    productosMensaje += `Total: $${totalProductos.toFixed(2)}`;
    alert(productosMensaje);
  },

  // Método para mostrar la lista de productos disponibles
  mostrarListaProductos: function () {
    let listaProductosMensaje = 'Lista de productos disponibles:\n\n';
    listaProductos.forEach((producto) => {
      listaProductosMensaje += `${producto.nombre}  |  Código: ${producto.codigo}  |  $${producto.precio.toFixed(2)} c/u\n`;
    });
    alert(listaProductosMensaje);
  },

  // Método para realizar el checkout
  checkout: function () {

    if (this.productos.length === 0) {
      alert('No hay mucho que hacer por aqui, tu carrito está vacío!\nAgrega productos para realizar tus compras');
      return;
    }


    this.mostrarProductos();

    const subtotal = this.calcularTotal();
    const iva = subtotal * 0.12;

    let checkoutMensaje = `--- CHECKOUT ---\n`;
    checkoutMensaje += `Subtotal: $${subtotal.toFixed(2)}\n`;
    checkoutMensaje += `IVA (12%): $${iva.toFixed(2)}\n`;
    checkoutMensaje += `Total a pagar: $${(subtotal + iva).toFixed(2)}\n`;

    const confirmacion = prompt(checkoutMensaje + '¿Desea realizar el pago? (s/n)');

    if (confirmacion.toLowerCase() === 's') {
      alert('¡Compra exitosa!');
      let productosCompradosMensaje = 'Productos comprados:\n';
      this.productos.forEach((producto) => {
        const subtotal = this.calcularSubtotal(producto);
        productosCompradosMensaje += `${producto.nombre} - ${producto.cantidad} unidades - Subtotal: $${subtotal.toFixed(2)}\n`;
      });
      productosCompradosMensaje += `Total de la compra: $${(subtotal + iva).toFixed(2)}`;
      alert(productosCompradosMensaje);
      this.productos = [];
    } else {
      alert('La compra ha sido cancelada. Gracias por utilizar el carrito de compras.');
    }
  },
};

// Lista de productos disponibles
const listaProductos = [
  new Producto('Curso de valores', 199.99, 100, 'k45'),
  new Producto('Libro de valores', 29.99, 100, 'k63'),
  new Producto('Juego de valores', 49.99, 100, 'k19'),
  new Producto('Curso de liderazgo', 149.99, 100, 'k11'),
  new Producto('Juegos y valores', 49.99, 100, 'k66'),
];

// Función para mostrar el menu y obtener la opción del usuario
function mostrarMenu() {
  let menuMensaje = '--- MENÚ ---\n\n';
  menuMensaje += '1. Mostrar lista de productos\n';
  menuMensaje += '2. Agregar producto al carrito\n';
  menuMensaje += '3. Quitar producto del carrito\n';
  menuMensaje += '4. Mostrar productos en el carrito\n';
  menuMensaje += '5. Realizar checkout\n';
  menuMensaje += '0. Salir\n';
  menuMensaje += '-------------\n';
  return prompt(menuMensaje);
}

// Función para ejecutar la opción seleccionada por el usuario
function ejecutarOpcion(opcion) {
  switch (opcion) {
    case '1':
      carritoDeCompras.mostrarListaProductos();
      break;
    case '2':
      let productosDisponiblesMensaje = 'Seleccione el producto que desea agregar:\n';
      listaProductos.forEach((producto) => {
        productosDisponiblesMensaje += `${producto.nombre} | Código: ${producto.codigo} | $${producto.precio.toFixed(2)}\n`;
      });
      const codigoProducto = prompt(productosDisponiblesMensaje + 'Ingrese el código del producto que desea agregar:');
      const productoSeleccionado = listaProductos.find((producto) => producto.codigo === codigoProducto);
      if (productoSeleccionado) {
        const cantidad = parseInt(prompt('Ingrese la cantidad deseada:'));
        carritoDeCompras.agregarProducto({ ...productoSeleccionado, cantidad });
      } else {
        alert('No se encontró el producto con el código ingresado.');
      }
      break;
    case '3':
    
      const codigoProductoQuitar = prompt(`Ingrese el código del producto que desea quitar:\n\n`);
      carritoDeCompras.quitarProducto(codigoProductoQuitar);
      break;
    case '4':
      carritoDeCompras.mostrarProductos();
      break;
    case '5':
      carritoDeCompras.checkout();
      break;
    case '0':
      alert('Gracias por usar el carrito de compras. ¡Hasta luego!');
      return;
    default:
      alert('Opción inválida. Por favor, ingrese una opción válida.');
  }

  const opcionSeleccionada = mostrarMenu();
  ejecutarOpcion(opcionSeleccionada);
}

// Iniciar la aplicación
alert(
  `______________________________________________________\n||||||| BIENVENIDO A LA TIENDA DE KRECENTI  |||||||||\n______________________________________________________\n`
);

const opcionSeleccionada = mostrarMenu();
ejecutarOpcion(opcionSeleccionada);
