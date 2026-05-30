// Variable global para guardar los productos del carrito
var carrito = [];

// Función para cambiar de pestaña en la página
function cambiarVista(vistaDestino) {
    var banner = document.getElementById('main-hero');

    // Mostrar u ocultar el banner según la pestaña
    if (vistaDestino === 'coleccion') {
        banner.className = 'hero'; // Quita la clase hidden
    } else {
        banner.className = 'hero hidden'; // Añade la clase hidden
    }

    // Ocultar todas las secciones primero
    var secciones = document.getElementsByClassName('view-section');
    for (var i = 0; i < secciones.length; i++) {
        secciones[i].className = 'view-section'; 
    }

    // Quitar el estilo activo a todos los enlaces del menú
    var enlaces = document.getElementsByClassName('nav-link');
    for (var j = 0; j < enlaces.length; j++) {
        enlaces[j].className = 'nav-link';
    }

    // Activar solo la sección que queremos ver
    document.getElementById('view-' + vistaDestino).className = 'view-section active';

    // Buscar el enlace del menú que pulsamos para ponerlo en negrita
    for (var k = 0; k < enlaces.length; k++) {
        if (enlaces[k].getAttribute('data-target') === vistaDestino) {
            enlaces[k].className = 'nav-link active';
        }
    }

    // Subir la pantalla automáticamente
    window.scrollTo(0, 0);

    // Si vamos al carrito, actualizar su lista en pantalla
    if (vistaDestino === 'carrito') {
        mostrarCarrito();
    }
}

// Función para actualizar el contador de ropa en el menú (ej: Carrito (3))
function actualizarContador() {
    var botonCarrito = document.getElementById('cart-btn');
    var totalArticulos = 0;

    for (var i = 0; i < carrito.length; i++) {
        totalArticulos = totalArticulos + carrito[i].cantidad;
    }

    botonCarrito.innerText = 'Carrito (' + totalArticulos + ')';
}

// Configurar los clics del menú de navegación
var enlacesMenu = document.getElementsByClassName('nav-link');
for (var i = 0; i < enlacesMenu.length; i++) {
    enlacesMenu[i].addEventListener('click', function(evento) {
        evento.preventDefault();
        var destino = this.getAttribute('data-target');
        cambiarVista(destino);
    });
}

// Configurar clic en el Logo ASTRO para ir a Colección
document.getElementById('nav-logo').addEventListener('click', function() {
    cambiarVista('coleccion');
});

// Configurar clic en el botón "Explorar" para ir a Hombre
document.getElementById('explore-btn').addEventListener('click', function() {
    cambiarVista('hombre');
});

// Configurar clics en los botones de "Añadir" de los productos
var botonesAnadir = document.getElementsByClassName('add-to-cart');
for (var i = 0; i < botonesAnadir.length; i++) {
    botonesAnadir[i].addEventListener('click', function(evento) {
        // Conseguimos la tarjeta contenedora subiendo un nivel en el HTML
        var tarjeta = evento.target.parentElement;
        var id = tarjeta.getAttribute('data-id');
        var nombre = tarjeta.getAttribute('data-name');
        var precio = parseFloat(tarjeta.getAttribute('data-price'));

        // Comprobar si el producto ya está en el carrito
        var encontrado = false;
        for (var j = 0; j < carrito.length; j++) {
            if (carrito[j].id === id) {
                carrito[j].cantidad = carrito[j].cantidad + 1;
                encontrado = true;
            }
        }

        // Si no estaba, lo añadimos como objeto nuevo
        if (encontrado === false) {
            var nuevoProducto = {
                id: id,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            };
            carrito.push(nuevoProducto);
        }

        actualizarContador();
    });
}

// Función para pintar la lista de la compra dentro de la pestaña Carrito
function mostrarCarrito() {
    var listaContenedor = document.getElementById('cart-items-list');
    var totalContenedor = document.getElementById('cart-total');
    
    listaContenedor.innerHTML = '';
    
    if (carrito.length === 0) {
        listaContenedor.innerHTML = '<p>El carrito está vacío.</p>';
        totalContenedor.innerText = '0.00';
        return;
    }

    var sumaTotal = 0;
    for (var i = 0; i < carrito.length; i++) {
        var precioArticulo = carrito[i].precio * carrito[i].cantidad;
        sumaTotal = sumaTotal + precioArticulo;

        // Crear fila de texto de manera limpia y sencilla
        var div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = '<span><strong>' + carrito[i].nombre + '</strong> (x' + carrito[i].cantidad + ')</span> <span>' + precioArticulo + '€</span>';
        
        listaContenedor.appendChild(div);
    }

    totalContenedor.innerText = sumaTotal;
}

// Configurar el botón de vaciar por completo la cesta
document.getElementById('clear-cart').addEventListener('click', function() {
    carrito = [];
    mostrarCarrito();
    actualizarContador();
});
