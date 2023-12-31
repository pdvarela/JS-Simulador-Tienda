// Peter Varela Comision 43125 Entrega Final

// Obtener referencias a los elementos HTML (dom) relevantes
const containerTienda = document.getElementById("tienda");
const carritoIcono = document.getElementById("carrito-icono");
const carritoContador = document.getElementById("carrito-contador");
const carritoModal = document.getElementById("carrito-modal");
const carritoProductos = document.getElementById("carrito-productos");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const btnPagar = document.getElementById("btn-pagar");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");


//Inicializar productos
let productos = [];

//Carga async de datos del Json pasa simular peticion a API
const cargarProductos = async () => {
  try {
    const respuesta = await fetch("./data.json");
    productos = await respuesta.json();
    mostrarProductos();
  } catch (error) {
    Toastify({

      text: "ERROR 404 / NO SE PUDO CARGAR LOS DATOS DEL SERVIDOR",
      duration: 10000,
      className: "toast-error",
      close: true,
      stopOnFocus: true,
      
    }).showToast();
  }
};

// Carrito de compras
let carrito = [];

// Mostrar los productos en la página
function mostrarProductos() {
  containerTienda.innerHTML = "";
  productos.forEach((producto) => {
    const { nombre, id, precio, imagen, descripcion } = producto;
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card">
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text overflow-auto card-description">${descripcion}</p>
          <p class="card-text fw-bold">$${precio.toFixed(2)}</p>
          <button class="btn btn-primary btn-comprar" data-id="${id}">Comprar</button>
          </div>
          </div>
          `;

    containerTienda.appendChild(card);
  });
}

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
  const contador = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
  carritoContador.textContent = contador;
}

// Actualizar el carrito en el modal
function actualizarCarrito() {
  carritoProductos.innerHTML = "";

  carrito.forEach((producto) => {
    const { nombre, precio, cantidad, id } = producto;

    const itemCarrito = document.createElement("li");
    itemCarrito.innerHTML = `
            <span>${nombre} - $${precio.toFixed(2)} x ${cantidad}</span>
            <button class="btn-eliminar-producto" data-id="${id}" data-action="eliminar">-</button>
            <button class="btn-eliminar-producto" data-id="${id}" data-action="eliminarTodo">Eliminar</button>
            <button class="btn-agregar-producto" data-id="${id}" data-action="agregar">+</button>
            `;

    carritoProductos.appendChild(itemCarrito);
  });
}

// Agregar un producto al carrito
function agregarAlCarrito(id) {
  const productoEncontrado = productos.find((producto) => producto.id === id);

  if (productoEncontrado) {
    const productoEnCarrito = carrito.find((producto) => producto.id === id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
      
      
    } else {
      carrito.push({
        id: productoEncontrado.id,
        nombre: productoEncontrado.nombre,
        precio: productoEncontrado.precio,
        cantidad: 1,
      });
    }

    Toastify({

      text: `x1 ${productoEncontrado.nombre} se agrego al carrito`,
      
      duration: 2400,
      className: "toast-azul",
      close: true,
      stopOnFocus: true,
      
      //Abre el carrito si se hace click en el toast de toastify
      onClick: () => {
        carritoModal.classList.add("show");
      }
      
    }).showToast();
    
    actualizarCarrito();
    actualizarContadorCarrito();
    guardarCarritoEnLocalStorage();
    actualizarTotalCarrito();
  }
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
  let nombreProductoEliminado = "";
  carrito = carrito
    .map((producto) => {
      if (producto.id === id) {
        producto.cantidad--;

        //capturo el nombre del producto a eliminar en una variable en el scope de la funcion eliminarDelCarrito
        nombreProductoEliminado = producto.nombre;
      }
      return producto;
    })
    .filter((producto) => producto.cantidad > 0);

  actualizarCarrito();
  actualizarContadorCarrito();
  guardarCarritoEnLocalStorage();
  actualizarTotalCarrito();

  Toastify({

    text: `x1 ${nombreProductoEliminado} se elimino del carrito`,
    duration: 2400,
    className: "toast-rojo",
    close: true,
    stopOnFocus: true,
    
  }).showToast();
}

// Eliminar todas las unidades de un producto del carrito
function eliminarTodoDelCarrito(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  actualizarCarrito();
  actualizarContadorCarrito();
  guardarCarritoEnLocalStorage();
  actualizarTotalCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
  carritoModal.classList.remove("show");
  carrito = [];
  actualizarCarrito();
  actualizarContadorCarrito();
  guardarCarritoEnLocalStorage();
  actualizarTotalCarrito();
}

//La uso para poder diferenciar entre un vaciado interno de un vaciado del usuario y evitar que el modal me tape los Sweet alert
function vaciarCarritoManualmente() {
  if (carrito.length == 0) {
    // Alerta de carrito vacío al intentar pagar
    carritoModal.classList.remove("show");
    Swal.fire({
      title: "Carrito vacío",
      text: "No hay productos en el carrito para realizar el pago.",
      icon: "error",
      confirmButtonColor: "#1B2DCC"
    });
  } else {
    // Preguntar confirmación antes de vaciar el carrito
    carritoModal.classList.remove("show");
    Swal.fire({
      title: "Confirmar vaciar carrito",
      text: "¿Estás seguro de que deseas vaciar el carrito?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Vaciar",
      confirmButtonColor: "#1B2DCC",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = [];
        actualizarCarrito();
        actualizarContadorCarrito();
        guardarCarritoEnLocalStorage();
        actualizarTotalCarrito();
        // Alerta de carrito vaciado
        carritoModal.classList.remove("show");
        Swal.fire({
          title: "Carrito vaciado",
          text: "El carrito se ha vaciado correctamente.",
          icon: "success",
          confirmButtonColor: "#1B2DCC"
        });
      }
    });
  }
}

// Función para actualizar el total en USD del carrito
function actualizarTotalCarrito() {
  const totalCarrito = obtenerTotalCarrito();
  const carritoTotalElement = document.getElementById("carrito-total");
  carritoTotalElement.textContent = `Total: ${totalCarrito} USD`;
  //Con el siguiente IF manipulo las clases del total para asegurarme que cambie el estilo del total cuando total es diferente de cero o cuando no
  if (totalCarrito > 0) {
    carritoTotalElement.classList.remove("carroSinProductos");
    carritoTotalElement.classList.add("carroConProductos");
  } else {
    carritoTotalElement.classList.remove("carroConProductos");
    carritoTotalElement.classList.add("carroSinProductos");
  }
}

// Obtener el total en dólares del carrito
function obtenerTotalCarrito() {
  const total = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio * producto.cantidad;
  }, 0);

  return total.toFixed(2);
}

// Pagar
function pagar() {
  if (carrito.length > 0) {
    // Confirmación antes de pagar
    carritoModal.classList.remove("show");
    Swal.fire({
      title: "Confirmar pago",
      text: `¿Estás seguro de que deseas realizar el pago por un total de ${obtenerTotalCarrito()} USD ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pagar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1B2DCC"
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulación de pago exitoso
        carritoModal.classList.remove("show");
        Swal.fire({
          title: "¡Pago realizado!",
          text: "Gracias por tu compra. El pago se ha realizado correctamente.",
          icon: "success",
          confirmButtonColor: "#1B2DCC"
        });
        vaciarCarrito();
        actualizarTotalCarrito();
        carritoModal.classList.remove("show");
      }
    });
  } else {
    // Alerta de carrito vacío al intentar pagar
    carritoModal.classList.remove("show");
    Swal.fire({
      title: "Carrito vacío",
      text: "No hay productos en el carrito para realizar el pago.",
      icon: "error",
      confirmButtonColor: "#1B2DCC"
    });
  }
}

// Cargar carrito desde el Local Storage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
    actualizarContadorCarrito();
    actualizarTotalCarrito();
  }
}

// Guardar carrito en el Local Storage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Evento para abrir el carrito modal
carritoIcono.addEventListener("click", () => {
  carritoModal.classList.add("show");
});

// Evento para cerrar el carrito modal

//Cuando se pulsa esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    carritoModal.classList.remove("show");
  }
});

//Cuanado se hace click en el icono de cerrar
btnCerrarCarrito.addEventListener("click", () => {
  carritoModal.classList.remove("show");
});

// Evento para agregar un producto al carrito
containerTienda.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-comprar")) {
    const id = parseInt(event.target.dataset.id);
    agregarAlCarrito(id);
  }
});

// Evento para eliminar un producto del carrito
carritoProductos.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-eliminar-producto")) {
    const id = parseInt(event.target.dataset.id);
    const action = event.target.dataset.action;

    if (action === "eliminar") {
      eliminarDelCarrito(id);
    } else if (action === "eliminarTodo") {
      eliminarTodoDelCarrito(id);
    }
  }
});

// Evento para agregar un producto al carrito
carritoProductos.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-agregar-producto")) {
    const id = parseInt(event.target.dataset.id);
    const action = event.target.dataset.action;

    if (action === "agregar") {
      agregarAlCarrito(id);
    }
  }
});

// Evento para vaciar el carrito
btnVaciarCarrito.addEventListener("click", () => {
  vaciarCarritoManualmente();
});

// Evento para pagar
btnPagar.addEventListener("click", pagar);

// Cargar carrito desde el Local Storage al cargar la página
document.addEventListener("DOMContentLoaded", cargarCarritoDesdeLocalStorage);

// Guardar carrito en el Local Storage antes de cerrar la página
window.addEventListener("beforeunload", guardarCarritoEnLocalStorage);

// Cargar datos Json y Mostrar los productos iniciales
cargarProductos();
