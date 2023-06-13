//variables para productos
let nombre0 = "Curso de valores";
let nombre1 = "Libro de valores";
let nombre2 = "Juego de valores";
let nombre3 = "Curso de liderazgo";
let nombre4 = "Juegos y valores";
//variables para precios
let precio0 = 199.99;
let precio1 = 29.99;
let precio2 = 49.99;
let precio3 = 149.99;
let precio4 = 49.99;
//Variables para almacenar cantidad de productos
let cantidad0 = 0;
let cantidad1 = 0;
let cantidad2 = 0;
let cantidad3 = 0;
let cantidad4 = 0;

/*Se declaran variables por cada producto con el fin de usar solamente los temas de la primera preentrega*/
let opcion;

//FUNCIONES
//AddToShoppingCart() contiene el proceso de agregar productos al carrito de compras
function ShowShoppingCart() {
  console.log(`${nombre0}: ${cantidad0}`);
  console.log(`${nombre1}: ${cantidad1}`);
  console.log(`${nombre2}: ${cantidad2}`);
  console.log(`${nombre3}: ${cantidad3}`);
  console.log(`${nombre4}: ${cantidad4}\n\n\n`);
}

function RemoveFromShoppingCart() {
  let entrada;
  let totalProductos =
    cantidad0 + cantidad1 + cantidad2 + cantidad3 + cantidad4;
  if (totalProductos > 0) {
    do {
      entrada = prompt(
        `¿Qué deseas sacar del carrito? Elije una opcion:\n\n1. ${nombre0}\n2. ${nombre1}\n3. ${nombre2}\n4. ${nombre3}\n5. ${nombre4}\n    (0) Cero para vaciar el carrito\n    (C) Para volver al menu principal\n`
      );

      switch (parseInt(entrada)) {
        case 1:
          if (cantidad0 == 0) {
            alert(`Aun no agregastes ${nombre0} a tu carrito`);
          } else {
            do {
              subtotal = parseInt(
                prompt(`Cuantos ${nombre0} deseas eliminar del carrito?`)
              );

              if (subtotal > cantidad0 || isNaN(subtotal) || subtotal < 0) {
                console.log(
                  `Error: La cantidad debe ser un número entero positivo y menor a ${cantidad0}`
                );
              }
            } while (subtotal > cantidad0 || isNaN(subtotal) || subtotal < 0);
            cantidad0 = cantidad0 - subtotal;
          }

          alert(`Tienes un total de ${cantidad0} ${nombre0} en tu carrito`);

          break;

        case 2:
          if (cantidad1 == 0) {
            alert(`Aun no agregastes ${nombre1} a tu carrito`);
          } else {
            do {
              subtotal = parseInt(
                prompt(`Cuantos ${nombre1} deseas eliminar del carrito?`)
              );

              if (subtotal > cantidad1 || isNaN(subtotal) || subtotal < 0) {
                console.log(
                  `Error: La cantidad debe ser un número entero positivo y menor a ${cantidad1}`
                );
              }
            } while (subtotal > cantidad1 || isNaN(subtotal) || subtotal < 0);
            cantidad1 = cantidad1 - subtotal;
          }

          alert(`Tienes un total de ${cantidad1} ${nombre1} en tu carrito`);

          break;

        case 3:
          console.log(`${cantidad2}`);
          if (cantidad2 == 0) {
            alert(`Aun no agregastes ${nombre2} a tu carrito`);
          } else {
            do {
              subtotal = parseInt(
                prompt(`Cuantos ${nombre2} deseas eliminar del carrito?`)
              );

              if (subtotal > cantidad2 || isNaN(subtotal) || subtotal < 0) {
                console.log(
                  `Error: La cantidad debe ser un número entero positivo y menor a ${cantidad2}`
                );
              }
            } while (subtotal > cantidad2 || isNaN(subtotal) || subtotal < 0);
            cantidad2 = cantidad2 - subtotal;
          }

          alert(`Tienes un total de ${cantidad2} ${nombre2} en tu carrito`);

          break;

        case 4:
          if (cantidad3 == 0) {
            alert(`Aun no agregastes ${nombre3} a tu carrito`);
          } else {
            do {
              subtotal = parseInt(
                prompt(`Cuantos ${nombre3} deseas eliminar del carrito?`)
              );

              if (subtotal > cantidad3 || isNaN(subtotal) || subtotal < 0) {
                console.log(
                  `Error: La cantidad debe ser un número entero positivo y menor a ${cantidad3}`
                );
              }
            } while (subtotal > cantidad3 || isNaN(subtotal) || subtotal < 0);
            cantidad3 = cantidad3 - subtotal;
          }

          alert(`Tienes un total de ${cantidad3} ${nombre3} en tu carrito`);

          break;

        case 5:
          if (cantidad4 == 0) {
            alert(`Aun no agregastes ${nombre4} a tu carrito`);
          } else {
            do {
              subtotal = parseInt(
                prompt(`Cuantos ${nombre4} deseas eliminar del carrito?`)
              );

              if (subtotal > cantidad4 || isNaN(subtotal) || subtotal < 0) {
                console.log(
                  `Error: La cantidad debe ser un número entero positivo y menor a ${cantidad4}`
                );
              }
            } while (subtotal > cantidad4 || isNaN(subtotal) || subtotal < 0);
            cantidad4 = cantidad4 - subtotal;
          }

          alert(`Tienes un total de ${cantidad4} ${nombre4} en tu carrito`);

          break;

        case 0:
          cantidad0 = 0;
          cantidad1 = 0;
          cantidad2 = 0;
          cantidad3 = 0;
          cantidad4 = 0;
          alert(
            `Has vaciado exitosamente tu carrito\n${nombre0}: ${cantidad0}\n${nombre1}: ${cantidad1}\n${nombre2}: ${cantidad2}\n${nombre3}: ${cantidad3}\n${nombre4}: ${cantidad4}`
          );
          break;

        default:
          break;
      }
      console.log(`-----MI CARRITO-----`);
      ShowShoppingCart();
    } while (entrada != "c" && entrada != "C");
  } else {
    alert(
      `No tienes para sacar del carrito (${totalProductos} Productos en el carrito)`
    );
  }
}

function AddToShoppingCart() {
  let entrada;
  do {
    entrada = prompt(
      `Elije los productos a comprar, presiona la opcion que deseas:\n\n1. ${nombre0}\n2. ${nombre1}\n3. ${nombre2}\n4. ${nombre3}\n5. ${nombre4}\n   (C) Para Ir al Menu principal --->\n`
    );
    console.log(`TU CARRITO DE COMPRAS\n\n`);
    switch (parseInt(entrada)) {
      case 1:
        do {
          cantidad0 =
            cantidad0 +
            parseInt(prompt(`Cuantos ${nombre0} deseas agregar al carrito?`));
          if (isNaN(cantidad0) || cantidad0 <= 0) {
            console.log(
              "Error: La cantidad debe ser un número entero positivo."
            );
            cantidad0 = 0;
          }
        } while (isNaN(cantidad0) || cantidad0 < 0);
        alert(
          `Agregaste un total de ${cantidad0} ${nombre0} a tu carrito (${
            cantidad0 * precio0
          } USD)`
        );

        break;

      case 2:
        do {
          cantidad1 =
            cantidad1 +
            parseInt(prompt(`Cuantos ${nombre1}  deseas agregar al carrito?`));
          if (isNaN(cantidad1) || cantidad1 <= 0) {
            console.log(
              "Error: La cantidad debe ser un número entero positivo."
            );
            cantidad1 = 0;
          }
        } while (isNaN(cantidad1) || cantidad1 < 0);
        alert(
          `Agregaste un total de ${cantidad1} ${nombre1} a tu carrito (${
            cantidad1 * precio1
          } USD)`
        );

        break;

      case 3:
        do {
          cantidad2 =
            cantidad2 +
            parseInt(prompt(`Cuantos ${nombre2} deseas agregar al carrito?`));
          if (isNaN(cantidad2) || cantidad2 <= 0) {
            console.log(
              "Error: La cantidad debe ser un número entero positivo."
            );
            cantidad2 = 0;
          }
        } while (isNaN(cantidad2) || cantidad2 < 0);
        alert(
          `Agregaste un total de ${cantidad2} ${nombre2} a tu carrito (${
            cantidad2 * precio2
          } USD)`
        );

        break;

      case 4:
        do {
          cantidad3 =
            cantidad3 +
            parseInt(prompt(`Cuantos ${nombre3} deseas agregar al carrito?`));
          if (isNaN(cantidad3) || cantidad3 <= 0) {
            console.log(
              "Error: La cantidad debe ser un número entero positivo."
            );
            cantidad3 = 0;
          }
        } while (isNaN(cantidad3) || cantidad3 < 0);
        alert(
          `Agregaste un total de ${cantidad3} ${nombre3} a tu carrito (${
            cantidad3 * precio3
          } USD)`
        );

        break;

      case 5:
        do {
          cantidad4 =
            cantidad4 +
            parseInt(prompt(`Cuantos ${nombre4} deseas agregar al carrito?`));
          if (isNaN(cantidad4) || cantidad4 <= 0) {
            console.log(
              "Error: La cantidad debe ser un número entero positivo."
            );
            cantidad4 = 0;
          }
        } while (isNaN(cantidad4) || cantidad4 < 0);
        alert(
          `Agregaste un total de ${cantidad4} ${nombre4} a tu carrito (${
            cantidad4 * precio4
          } USD)`
        );

        break;

      default:
        break;
    }
    ShowShoppingCart();
  } while (entrada != "c" && entrada != "C");
}

function payment(pagar) {
  let entrada = "";

  do {
    entrada = prompt(
      `SUBTOTAL: ${pagar.toFixed(2)}USD\nIVA 12%: ${(pagar * 0.12).toFixed(
        2
      )}USD\nTOTAL A PAGAR: ${(pagar * 0.12 + pagar).toFixed(
        2
      )} USD\n\n¿Pagar ahora?\n\n1. SI\n2. NO\n`
    );
    if (entrada < 1 || entrada > 2 || isNaN(entrada)) {
      alert(`Ingresa 1 o 2 para elegir correctamente`);
    }
  } while (entrada < 1 || entrada > 2 || isNaN(entrada));
  if (entrada == 1) {
    alert(
      `FELICIDADES PAGASTE CORRECTAMENTE: ${(pagar * 0.12 + pagar).toFixed(
        2
      )} USD\n\n ·····GRACIAS POR TU COMPRA·····`
    );
    cantidad0 = 0;
    cantidad1 = 0;
    cantidad2 = 0;
    cantidad3 = 0;
    cantidad4 = 0;
  }
}

function CheckOut() {
  let entrada = "";
  let pagar = parseFloat(
    cantidad0 * precio0 +
      cantidad1 * precio1 +
      cantidad2 * precio2 +
      cantidad3 * precio3 +
      cantidad4 * precio4
  );

  if (pagar > 0) {
    alert(`                        -----CHECKOUT-----\n
        NOMBRE | CANTIDAD | PRECIO | SUBTOTAL
        ${nombre0} | ${cantidad0} | ${precio0}$ | ${(
      cantidad0 * precio0
    ).toFixed(2)}$
        ${nombre1} | ${cantidad1} | ${precio1}$ | ${(
      cantidad0 * precio1
    ).toFixed(2)}$
        ${nombre2} | ${cantidad2} | ${precio2}$ | ${(
      cantidad0 * precio2
    ).toFixed(2)}$
        ${nombre3} | ${cantidad3} | ${precio3}$ | ${(
      cantidad0 * precio3
    ).toFixed(2)}$
        ${nombre4} | ${cantidad4} | ${precio4}$ | ${(
      cantidad0 * precio4
    ).toFixed(2)}$
        -----TOTAL A PAGAR: ${pagar.toFixed(2)} USD`);

    do {
      entrada = prompt(`¿Pagar ahora?\n\n1. SI\n2. NO\n`);
      if (entrada < 1 || entrada > 2 || isNaN(entrada)) {
        alert(`Ingresa 1 o 2 para elegir correctamente`);
      }
    } while (entrada < 1 || entrada > 2 || isNaN(entrada));

    if (entrada == "1") {
      payment(pagar);
    }
  } else {
    alert(`No has elegido productos para hacer checkout`);
  }
}

//Estructura

alert(
  `______________________________________________________\n||||||| BIENVENIDO A LA TIENDA DE KRECENTI  |||||||||\n______________________________________________________\n`
);
AddToShoppingCart();
do {
  do {
    opcion = prompt(
      "1. Hacer Checkout de tu carrito\n2. Eliminar productos\n3. Agregar más productos\n    (S) Para salir"
    );

    switch (parseInt(opcion)) {
      case 1:
        CheckOut();
        break;

      case 2:
        RemoveFromShoppingCart();
        break;

      case 3:
        AddToShoppingCart();
        break;

      default:
        alert(`Has salido de portal de compras, vuelve pronto`);
        opcion = "S";
        break;
    }
  } while (opcion != "s" && opcion != "S" && (opcion < 1 || opcion > 3));
} while (opcion != "s" && opcion != "S");
